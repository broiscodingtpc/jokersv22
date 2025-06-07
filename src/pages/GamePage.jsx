import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import backToHome from "../assets/backtohome.png";
import jokerIdle from "../assets/Main Joker Character (Idle Pose).png";
import jokerWin from "../assets/Joker Exploding  Freaking Out (When You Win).png";
import jokerLose from "../assets/Joker Laughing (When You Lose).png";
import fightBtn from "../assets/fightthejokerbutton.png";
import winPopup from "../assets/resultpopupyouwin.png";
import losePopup from "../assets/resultpopupjokerwins.png";

const mvpTexts = [
  "�� MVP DEMO VERSION - TRY THE GAME NOW!",
  "💎 PLAY WITH NATIVE $JOKER TOKEN!",
  "🎲 MORE GAMES COMING SOON - STAY TUNED!",
  "🎯 IMPROVEMENTS AND NEW FEATURES IN DEVELOPMENT!",
  "🎪 WELCOME TO THE JOKER'S ARENA!"
];

// Constants
const INITIAL_BALANCE = 10000;
const MIN_BET = 100;
const MAX_BET = 10000;
const WIN_CHANCE = 0.5;
const LOADING_TIME = 1500;
const RESULT_DISPLAY_TIME = 2000;
const POPUP_DISPLAY_TIME = 3000;

export default function GamePage() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [bet, setBet] = useState(0);
  const [jokerImage, setJokerImage] = useState(jokerIdle);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const funnyMessages = {
    noMoney: [
      "NOT ENOUGH TOKENS, POOR JOKER! 🎭",
      "YOUR WALLET IS CRYING! 💸",
      "EVEN THE JOKER FEELS SORRY FOR YOU! 😢"
    ],
    win: [
      "LUCKY YOU! THE JOKER IS IMPRESSED! 🎉",
      "YOU BEAT THE JOKER! (HE'S NOT HAPPY) 😈",
      "WINNER WINNER, JOKER'S DINNER! 🎯"
    ],
    lose: [
      "THE JOKER LAUGHS AT YOUR LOSS! 😈",
      "BETTER LUCK NEXT TIME, LOSER! 🎭",
      "THE JOKER TAKES YOUR TOKENS! 💸"
    ],
    reset: [
      "BACK TO SQUARE ONE! ��",
      "THE JOKER RESETS THE GAME! 🎭",
      "FRESH START, FRESH LUCK! 🎯"
    ]
  };

  const showPopup = (type) => {
    const messages = funnyMessages[type];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setPopupMessage(randomMessage);
    setTimeout(() => setPopupMessage(''), POPUP_DISPLAY_TIME);
  };

  // Prevent multiple clicks
  const handlePlay = useCallback(() => {
    if (isProcessing || bet <= 0 || bet > balance) {
      if (bet > balance) {
        showPopup('noMoney');
      }
      return;
    }

    setIsProcessing(true);
    setIsLoading(true);

    setTimeout(() => {
      const didWin = Math.random() < WIN_CHANCE;
      setBalance((prev) => {
        const newBalance = prev + (didWin ? bet : -bet);
        // Ensure balance doesn't go below 0
        return Math.max(0, newBalance);
      });
      setResult(didWin ? 'win' : 'lose');
      setShowResult(true);
      setIsLoading(false);
      showPopup(didWin ? 'win' : 'lose');

      setTimeout(() => {
        setShowResult(false);
        setResult(null);
        setIsProcessing(false);
      }, RESULT_DISPLAY_TIME);
    }, LOADING_TIME);
  }, [bet, balance, isProcessing]);

  // Validate bet amount
  const handleBet = useCallback((amount) => {
    if (amount <= balance && amount >= MIN_BET && amount <= MAX_BET) {
      setBet(amount);
    }
  }, [balance]);

  // Reset game with validation
  const resetGame = useCallback(() => {
    if (!isProcessing) {
      setBalance(INITIAL_BALANCE);
      setBet(0);
      setResult(null);
      setShowResult(false);
      showPopup('reset');
    }
  }, [isProcessing]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  // Prevent accidental navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isProcessing) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isProcessing]);

  return (
    <div className="game-page">
      <button className="back-to-home" onClick={() => navigate('/')}>
        <img src={backToHome} alt="Back to Home" />
      </button>
      <div className="game-container">
        <div className="game-header">
          <h1>JOKER'S ARENA</h1>
          <div className="balance">
            Balance: {balance.toLocaleString()} $JOKER
          </div>
        </div>

        <div className="game-content">
          <img src={jokerImage} alt="Joker" className="joker-image" />
          
          <div className="bet-buttons">
            {[100, 500, 1000].map((amount) => (
              <button
                key={amount}
                className={`bet-btn ${bet === amount ? 'active' : ''}`}
                onClick={() => handleBet(amount)}
              >
                BET {amount}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '300px', margin: '20px auto', height: '80px' }}>
            <button
              className="fight-button"
              onClick={handlePlay}
              disabled={bet <= 0 || bet > balance || showResult || isLoading}
              style={{ display: (showResult || isLoading) ? 'none' : 'block' }}
            >
              FIGHT THE JOKER
            </button>
            {isLoading && (
              <div className="loading-effect">
                <div className="loading-text">JOKER THINKING...</div>
              </div>
            )}
            {showResult && (
              <div className="result-popup">
                <img 
                  src={result === 'win' ? winPopup : losePopup} 
                  alt={result === 'win' ? 'You Win!' : 'Joker Wins!'} 
                />
              </div>
            )}
          </div>

          <button className="reset-btn" onClick={resetGame}>
            RESET GAME
          </button>
        </div>

        <div className="mvp-info">
          <div className="ticker-container">
            {mvpTexts.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
            {mvpTexts.map((text, index) => (
              <p key={`duplicate-${index}`}>{text}</p>
            ))}
          </div>
        </div>

        {popupMessage && (
          <div className="funny-popup">
            {popupMessage}
          </div>
        )}
      </div>
    </div>
  );
} 