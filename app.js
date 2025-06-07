// Constants
const JOKER_TOKEN_ADDRESS = 'jkercFfxVbfDtQUHRF7G6KKpGDEp3KjkBYrgESAjzJK';
const MIN_BET = 50000;
const MAX_BET = 1000000;
const HOUSE_EDGE = 0.05; // 5% edge pentru house
const HOUSE_WALLET = 'jkrtQ5V9FpZw2wxzAVJx6SaNzfz6h9aZkv3HUdaS3B4';
const USER_WIN_CHANCE = 0.1; // 10% șansă de câștig pentru utilizator
const PROGRAM_ID = 'jkercFfxVbfDtQUHRF7G6KKpGDEp3KjkBYrgESAjzJK';

// RPC Endpoints
const RPC_ENDPOINTS = [
    'https://solana-mainnet.g.alchemy.com/v2/demo',
    'https://solana-api.projectserum.com'
];

// Global variables
let wallet = null;
let connection = null;
let tokenBalance = 0;
let program = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Solana connection
    async function initializeConnection() {
        try {
            if (typeof solanaWeb3 === 'undefined') {
                throw new Error('Solana Web3 library not loaded');
            }
            if (typeof splToken === 'undefined') {
                throw new Error('SPL Token library not loaded');
            }
            if (typeof anchor === 'undefined') {
                throw new Error('Anchor library not loaded');
            }

            connection = new solanaWeb3.Connection('https://api.mainnet-beta.solana.com', 'confirmed');
            console.log('Connected to Solana mainnet');
            
            // Initialize program
            const provider = new anchor.AnchorProvider(connection, window.solana, {});
            const idl = await anchor.Program.fetchIdl(PROGRAM_ID, provider);
            program = new anchor.Program(idl, PROGRAM_ID, provider);
            
            return true;
        } catch (error) {
            console.error('Failed to initialize connection:', error);
            return false;
        }
    }

    // Initialize connection
    initializeConnection().then(async (success) => {
        if (!success) {
            console.error('Error initializing connection');
            alert('Error connecting to Solana network. Please refresh the page and try again.');
            return;
        }

        // Get DOM elements
        const connectWalletBtn = document.getElementById('connectWallet');
        const walletInfo = document.getElementById('walletInfo');
        const tokenBalanceDisplay = document.getElementById('tokenBalance');
        const walletAddressDisplay = document.getElementById('walletAddress');
        const userBetInput = document.getElementById('userBet');
        const jokerMatchDisplay = document.getElementById('jokerMatch');
        const rollButton = document.getElementById('rollButton');
        const resultPopup = document.getElementById('resultPopup');
        const winVideo = document.getElementById('winVideo');
        const loseVideo = document.getElementById('loseVideo');
        const closePopup = document.querySelector('.close-popup');
        const buyTokenButton = document.querySelector('.buy-token-btn');
        const contentWrapper = document.querySelector('.content-wrapper');
        const backgroundVideo = document.getElementById('backgroundVideo');

        // Verify all required elements exist
        if (!connectWalletBtn || !walletInfo || !tokenBalanceDisplay || !walletAddressDisplay) {
            console.error('Required wallet elements not found');
            return;
        }

        // Connect Wallet
        connectWalletBtn.addEventListener('click', async () => {
            try {
                if (!window.solana) {
                    throw new Error('Phantom wallet not found!');
                }

                const resp = await window.solana.connect();
                wallet = resp.publicKey;
                console.log('Connected to wallet:', wallet.toString());
                
                // Update UI
                connectWalletBtn.style.display = 'none';
                walletInfo.style.display = 'block';
                walletAddressDisplay.textContent = wallet.toString().slice(0, 4) + '...' + wallet.toString().slice(-4);
                
                // Enable betting
                document.getElementById('betAmount').disabled = false;
                document.getElementById('rollButton').disabled = false;
                
                // Update balance
                await updateBalance();
            } catch (error) {
                console.error('Failed to connect wallet:', error);
                console.error('Error details:', {
                    message: error.message,
                    stack: error.stack
                });
                alert('Error connecting wallet. Please try again.');
            }
        });

        // Update token balance
        async function updateBalance() {
            try {
                if (!wallet) {
                    console.error('Wallet not connected');
                    return;
                }

                if (!connection) {
                    console.error('No connection to Solana network');
                    return;
                }

                console.log('Fetching balance for wallet:', wallet.toString());
                
                const tokenAccounts = await connection.getParsedTokenAccountsByOwner(wallet, {
                    mint: new solanaWeb3.PublicKey(JOKER_TOKEN_ADDRESS)
                });
                
                console.log('Token accounts found:', tokenAccounts.value.length);
                
                if (tokenAccounts.value.length > 0) {
                    const tokenAccount = tokenAccounts.value[0];
                    console.log('Token account data:', tokenAccount.account.data.parsed.info);
                    
                    const rawAmount = tokenAccount.account.data.parsed.info.tokenAmount.amount;
                    const decimals = tokenAccount.account.data.parsed.info.tokenAmount.decimals;
                    
                    console.log('Raw amount:', rawAmount);
                    console.log('Decimals:', decimals);
                    
                    tokenBalance = Number(rawAmount) / Math.pow(10, decimals);
                    
                    // Formatăm numărul pentru afișare
                    const formattedBalance = new Intl.NumberFormat('en-US').format(tokenBalance);
                    tokenBalanceDisplay.textContent = `${formattedBalance} $JOKER`;
                    
                    console.log('Final balance:', formattedBalance);
                } else {
                    console.log('No token account found for this wallet');
                    tokenBalance = 0;
                    tokenBalanceDisplay.textContent = '0 $JOKER';
                }
            } catch (err) {
                console.error('Error updating balance:', err);
                console.error('Error details:', {
                    message: err.message,
                    stack: err.stack
                });
                alert('Error updating balance. Please try again.');
            }
        }

        // Add event listeners only if elements exist
        if (userBetInput && jokerMatchDisplay) {
            userBetInput.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                if (value) {
                    if (value < MIN_BET) {
                        e.target.value = MIN_BET;
                    } else if (value > MAX_BET) {
                        e.target.value = MAX_BET;
                    }
                    jokerMatchDisplay.textContent = `${value} $JOKER`;
                } else {
                    jokerMatchDisplay.textContent = '0 $JOKER';
                }
            });
        }

        if (rollButton) {
            rollButton.addEventListener('click', async () => {
                const betAmount = parseInt(userBetInput.value);
                
                if (betAmount < MIN_BET || betAmount > MAX_BET) {
                    alert(`Bet amount must be between ${MIN_BET} and ${MAX_BET} tokens`);
                    return;
                }

                // Add shaking effect
                const dice = document.querySelector('.dice');
                dice.classList.add('shaking');
                
                // Place bet
                const success = await placeBet(betAmount);
                
                // Remove shaking effect after 1 second
                setTimeout(() => {
                    dice.classList.remove('shaking');
                    if (success) {
                        updateBalance();
                    }
                }, 1000);
            });
        }

        if (closePopup) {
            closePopup.addEventListener('click', () => {
                resultPopup.classList.remove('active');
                winVideo.pause();
                loseVideo.pause();
                winVideo.currentTime = 0;
                loseVideo.currentTime = 0;
                backgroundVideo.pause();
                backgroundVideo.currentTime = 0;
                backgroundVideo.classList.remove('active');
                
                // Reafișează conținutul
                contentWrapper.classList.remove('collapse');
                contentWrapper.classList.add('expand');
                
                setTimeout(() => {
                    contentWrapper.classList.remove('expand');
                }, 1000);
            });
        }

        if (resultPopup) {
            resultPopup.addEventListener('click', (e) => {
                if (e.target === resultPopup) {
                    resultPopup.classList.remove('active');
                    winVideo.pause();
                    loseVideo.pause();
                    winVideo.currentTime = 0;
                    loseVideo.currentTime = 0;
                    backgroundVideo.pause();
                    backgroundVideo.currentTime = 0;
                    backgroundVideo.classList.remove('active');
                    
                    // Reafișează conținutul
                    contentWrapper.classList.remove('collapse');
                    contentWrapper.classList.add('expand');
                    
                    setTimeout(() => {
                        contentWrapper.classList.remove('expand');
                    }, 1000);
                }
            });
        }

        if (buyTokenButton) {
            buyTokenButton.addEventListener('click', () => {
                window.open('https://jup.ag/swap/SOL-' + JOKER_TOKEN_ADDRESS, '_blank');
            });
        }

        // Adăugăm funcționalitate pentru butonul Buy Token din social buttons
        const buyTokenSocialBtn = document.getElementById('buyToken');
        if (buyTokenSocialBtn) {
            buyTokenSocialBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open('https://jup.ag/swap/SOL-' + JOKER_TOKEN_ADDRESS, '_blank');
            });
        }
    });
});

// Place bet
async function placeBet(amount) {
    try {
        if (!wallet || !program) {
            throw new Error('Wallet or program not initialized');
        }

        // Get token accounts
        const userTokenAccount = await getTokenAccount(wallet);
        const houseTokenAccount = await getTokenAccount(new solanaWeb3.PublicKey(HOUSE_WALLET));

        // Create transaction
        const tx = await program.methods
            .placeBet(new anchor.BN(amount))
            .accounts({
                user: wallet,
                house: new solanaWeb3.PublicKey(HOUSE_WALLET),
                userTokenAccount: userTokenAccount,
                houseTokenAccount: houseTokenAccount,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .rpc();

        console.log('Bet placed successfully:', tx);
        return true;
    } catch (error) {
        console.error('Failed to place bet:', error);
        return false;
    }
}

// Funcție pentru transfer de tokeni către utilizator (când câștigă)
async function transferTokensToUser(fromWallet, amount) {
    try {
        if (!wallet || !connection) {
            throw new Error('Wallet sau conexiune lipsă');
        }

        const mintPubkey = new solanaWeb3.PublicKey(JOKER_TOKEN_ADDRESS);
        const fromPubkey = new solanaWeb3.PublicKey(HOUSE_WALLET);
        const toPubkey = new solanaWeb3.PublicKey(fromWallet);

        // Obține token account-urile
        const fromTokenAccount = await connection.getParsedTokenAccountsByOwner(fromPubkey, {
            mint: mintPubkey
        });

        const toTokenAccount = await connection.getParsedTokenAccountsByOwner(toPubkey, {
            mint: mintPubkey
        });

        if (fromTokenAccount.value.length === 0 || toTokenAccount.value.length === 0) {
            throw new Error('Token account-uri lipsă');
        }

        // Creează instrucțiunea de transfer folosind @solana/spl-token
        const transferInstruction = splToken.createTransferInstruction(
            fromTokenAccount.value[0].pubkey,
            toTokenAccount.value[0].pubkey,
            fromPubkey,
            amount * Math.pow(10, 9) // Convertim în unități de bază
        );

        // Trimite tranzacția
        const transaction = new solanaWeb3.Transaction().add(transferInstruction);
        const signature = await window.solana.signAndSendTransaction(transaction);
        
        console.log('Transfer reușit către utilizator:', signature);
        return signature;
    } catch (err) {
        console.error('Eroare la transfer către utilizator:', err);
        throw err;
    }
}

// Funcție pentru transfer de tokeni către house (când utilizatorul pierde)
async function transferTokensToHouse(fromWallet, amount) {
    try {
        if (!wallet || !connection) {
            throw new Error('Wallet sau conexiune lipsă');
        }

        const mintPubkey = new solanaWeb3.PublicKey(JOKER_TOKEN_ADDRESS);
        const fromPubkey = new solanaWeb3.PublicKey(fromWallet);
        const toPubkey = new solanaWeb3.PublicKey(HOUSE_WALLET);

        // Obține token account-urile
        const fromTokenAccount = await connection.getParsedTokenAccountsByOwner(fromPubkey, {
            mint: mintPubkey
        });

        const toTokenAccount = await connection.getParsedTokenAccountsByOwner(toPubkey, {
            mint: mintPubkey
        });

        if (fromTokenAccount.value.length === 0 || toTokenAccount.value.length === 0) {
            throw new Error('Token account-uri lipsă');
        }

        // Creează instrucțiunea de transfer folosind @solana/spl-token
        const transferInstruction = splToken.createTransferInstruction(
            fromTokenAccount.value[0].pubkey,
            toTokenAccount.value[0].pubkey,
            fromPubkey,
            amount * Math.pow(10, 9) // Convertim în unități de bază
        );

        // Trimite tranzacția
        const transaction = new solanaWeb3.Transaction().add(transferInstruction);
        const signature = await window.solana.signAndSendTransaction(transaction);
        
        console.log('Transfer reușit către house:', signature);
        return signature;
    } catch (err) {
        console.error('Eroare la transfer către house:', err);
        throw err;
    }
}

// Funcție pentru verificarea token account-urilor
async function checkTokenAccounts() {
    try {
        if (!wallet || !connection) {
            throw new Error('Wallet sau conexiune lipsă');
        }

        const mintPubkey = new solanaWeb3.PublicKey(JOKER_TOKEN_ADDRESS);
        const userPubkey = new solanaWeb3.PublicKey(wallet);
        const housePubkey = new solanaWeb3.PublicKey(HOUSE_WALLET);

        // Verifică token account-urile utilizatorului
        const userTokenAccounts = await connection.getParsedTokenAccountsByOwner(userPubkey, {
            mint: mintPubkey
        });

        // Verifică token account-urile house-ului
        const houseTokenAccounts = await connection.getParsedTokenAccountsByOwner(housePubkey, {
            mint: mintPubkey
        });

        console.log('User token accounts:', userTokenAccounts.value.length);
        console.log('House token accounts:', houseTokenAccounts.value.length);

        return {
            userHasTokenAccount: userTokenAccounts.value.length > 0,
            houseHasTokenAccount: houseTokenAccounts.value.length > 0
        };
    } catch (err) {
        console.error('Eroare la verificarea token account-urilor:', err);
        throw err;
    }
} 