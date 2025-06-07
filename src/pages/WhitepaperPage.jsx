import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import backToHome from '../assets/backtohome.png';
import backBtn from "../assets/back.png";
import nextBtn from "../assets/next.png";
import tokenomicsGraph from "../assets/tokenomicsgraph.png";
import whitepaperBg from "../assets/whitepaperbackground.png";

export default function WhitepaperPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "🎭 Overview",
      content: (
        <>
          <p>Welcome to Joker's Arena, where degeneracy meets destiny.</p>
          <p>We're not here to be a token. We're here to be a movement. A test of loyalty. A slap to the face of every jeet and fake community builder out there.</p>
        </>
      )
    },
    {
      title: "📦 Supply & Presale",
      content: (
        <>
          <ul>
            <li>Total Supply: 1,000,000,000 $JOKER</li>
            <li>Presale Price: 1 SOL = 1,000,000 $JOKER</li>
            <li>Presale Cap: 400 SOL (400M tokens)</li>
            <li>Presale Wallet: jkrtQ5V9FpZw2wxzAVJx6SaNzfz6h9aZkv3HUdaS3B4</li>
            <li>Contract Address (CA): jkercFfxVbfDtQUHRF7G6KKpGDEp3KjkBYrgESAjzJK</li>
          </ul>
          <p>No bots. No forms. No whitelist.</p>
          <p>Just raw, clown-certified loyalty.</p>
        </>
      )
    },
    {
      title: "💧 Launch Strategy",
      content: (
        <>
          <h3>🔹 Phase 1 – Initial Liquidity</h3>
          <ul>
            <li>150M $JOKER + 200 SOL</li>
            <li>Launch price: 0.00000133 SOL/token</li>
            <li>Value of 1M tokens: ~1.33 SOL</li>
            <li>Initial Market Cap: ~1,333 SOL ≈ $200K</li>
          </ul>
          <h3>🔸 Phase 2 – Post-Launch Push</h3>
          <ul>
            <li>Add 50M $JOKER + 100 SOL</li>
            <li>Purpose: pump the floor, crush weak hands, reward the strong</li>
          </ul>
        </>
      )
    },
    {
      title: "📊 Tokenomics Breakdown",
      content: (
        <>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Allocation</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Presale</td>
                <td>40%</td>
                <td>Raise 400 SOL, early access</td>
              </tr>
              <tr>
                <td>Liquidity</td>
                <td>20%</td>
                <td>LP + market floor</td>
              </tr>
              <tr>
                <td>Utility</td>
                <td>10%</td>
                <td>Raffles, staking, drops</td>
              </tr>
              <tr>
                <td>Strategic Partners</td>
                <td>8%</td>
                <td>Networking & marketing synergy</td>
              </tr>
              <tr>
                <td>Dev Wallets</td>
                <td>5%</td>
                <td>Team reward (no vesting)</td>
              </tr>
              <tr>
                <td>Marketing</td>
                <td>3%</td>
                <td>Paid ads, influencers, launches</td>
              </tr>
              <tr>
                <td>Emergency Vault</td>
                <td>3.5%</td>
                <td>Safety net for future chaos</td>
              </tr>
            </tbody>
          </table>
          <p>🟢 10.5% already sold OTC – OGs loaded up with 3 SOL = 35M tokens each.</p>
        </>
      )
    },
    {
      title: "🎁 Loyalty Airdrop",
      content: (
        <>
          <p>Hold 100% of your presale tokens until $1M MC?</p>
          <ul>
            <li>✅ Snapshot randomly</li>
            <li>🎉 You'll get free $JOKER</li>
            <li>❌ Sell even 1? You're disqualified. No crying.</li>
          </ul>
        </>
      )
    },
    {
      title: "🎰 Utility",
      content: (
        <>
          <ul>
            <li>🎟️ Raffle Bot – dropping soon, built in-house</li>
            <li>🔒 Staking – lock & earn more $JOKER</li>
            <li>🎮 1v1 Game vs Joker – mock launch MVP live first</li>
            <li>🎲 Future games coming (only $JOKER usable)</li>
            <li>📉 Anti-jeet tokenomics + rewards for holders</li>
          </ul>
        </>
      )
    },
    {
      title: "🧠 Team",
      content: (
        <>
          <ul>
            <li>👨‍💻 @TinKode69 (JokerFather)</li>
            <li>🤝 @O_E_X_E_O</li>
            <li>🔧 @Soltrapper25</li>
            <li>🧠 @Jhnpapi</li>
            <li>🎨 @Gratzmiva99</li>
          </ul>
          <p>We're building daily. No mystery team. No rugs.</p>
          <p>All pain. All power. All purple.</p>
        </>
      )
    },
    {
      title: "📲 Links",
      content: (
        <>
          <ul>
            <li>Telegram: <a href="https://t.me/JOKERS_ARENA" target="_blank" rel="noopener noreferrer">t.me/JOKERS_ARENA</a></li>
            <li>Presale Wallet: jkrtQ5V9FpZw2wxzAVJx6SaNzfz6h9aZkv3HUdaS3B4</li>
            <li>CA: jkercFfxVbfDtQUHRF7G6KKpGDEp3KjkBYrgESAjzJK</li>
          </ul>
        </>
      )
    },
    {
      title: "🎤 Final Words",
      content: (
        <>
          <p>This isn't just a launch. It's a loyalty experiment.</p>
          <p>Will you hold when the clowns are screaming?</p>
          <p>Will you sell when the Joker is watching?</p>
          <p>This is $JOKER.</p>
          <p>Why so serious?</p>
        </>
      )
    }
  ];

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="whitepaper-page" style={{ backgroundImage: `url(${whitepaperBg})` }}>
      <button className="back-to-home" onClick={() => navigate('/')}>
        <img src={backToHome} alt="Back to Home" />
      </button>
      <div className="content-container">
        {pages.map((page, index) => (
          <div 
            key={index} 
            className={`content-card ${index === currentPage ? 'active' : ''}`}
          >
            <h2 className="content-title">{page.title}</h2>
            <div className="content-text">
              {page.content}
            </div>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button 
          className="nav-btn" 
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          <img src={backBtn} alt="Previous" />
        </button>
        <button 
          className="nav-btn" 
          onClick={handleNextPage}
          disabled={currentPage === pages.length - 1}
        >
          <img src={nextBtn} alt="Next" />
        </button>
      </div>
    </div>
  );
} 