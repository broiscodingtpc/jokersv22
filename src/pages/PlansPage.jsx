import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import backToHome from '../assets/backtohome.png';
import backBtn from "../assets/back.png";
import nextBtn from "../assets/next.png";
import tokenomicsGraph from "../assets/tokenomicsgraph.png";
import plansBg from "../assets/plansbackground.png";

export default function PlansPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "🎭 The Arena Opens",
      content: (
        <>
          <p>Welcome to the arena of madness, where Solana's next big utility token is hiding behind a twisted grin.</p>
          <p>No VC handouts. No slow rugs.</p>
          <p>Just a degen plan with a purpose.</p>
        </>
      )
    },
    {
      title: "🎯 Roadmap",
      content: (
        <>
          <h3>Phase 1 – Presale & Foundation</h3>
          <ul>
            <li>✅ 1B Supply created</li>
            <li>✅ Presale live (400M tokens for 400 SOL)</li>
            <li>✅ Loyalty Airdrop announced</li>
            <li>✅ 10.5% sold OTC to OGs</li>
          </ul>
          <h3>Phase 2 – Launch & LP</h3>
          <ul>
            <li>🚀 Add 150M tokens + 200 SOL to Raydium</li>
            <li>🧱 Post-launch push with 50M + 100 SOL</li>
            <li>💀 Anti-jeet LP strategy</li>
            <li>📢 Twitter push, meme warfare, TG raids</li>
          </ul>
        </>
      )
    },
    {
      title: "🎮 Game MVP",
      content: (
        <>
          <ul>
            <li>1v1 Game vs Joker released (mock token)</li>
            <li>No real tokens at start</li>
            <li>Fake $JOKER balance to simulate gameplay</li>
            <li>Joker reacts to your wins/losses (AI + animation)</li>
          </ul>
        </>
      )
    },
    {
      title: "🤖 Utility Bots",
      content: (
        <>
          <h3>🎟️ Raffle Bot</h3>
          <ul>
            <li>In development (launching days after presale ends)</li>
            <li>Accepts $JOKER for entry</li>
            <li>Sends real prize pools to winners</li>
            <li>Can be hosted in Telegram, on-site, or both</li>
          </ul>
          <h3>🧱 Staking</h3>
          <ul>
            <li>Lock $JOKER, earn more $JOKER</li>
            <li>Simple rewards, boosted for presale holders</li>
            <li>Linked to engagement and raffle participation</li>
          </ul>
        </>
      )
    },
    {
      title: "🧩 Expansion Plan",
      content: (
        <>
          <ul>
            <li>⚔️ More Games: Dice duels, coin flip, Joker roulette</li>
            <li>🃏 NFT Integration: Custom joker avatars & perks</li>
            <li>🔐 Holder-Only Airdrops: Only for loyal arena fighters</li>
            <li>📈 Marketing KOLs locked in post-launch</li>
            <li>🧠 Weekly community AMAs and reveals</li>
          </ul>
        </>
      )
    },
    {
      title: "🧙‍♂️ Vision",
      content: (
        <>
          <p>We're not just building a token — we're building a crypto fight club, a test of patience and power, wrapped in memes and madness.</p>
          <p>The Joker doesn't promise safety.</p>
          <p>He promises entertainment.</p>
          <p>And in this arena... only the clowns win.</p>
        </>
      )
    },
    {
      title: "🧠 Project Links",
      content: (
        <>
          <ul>
            <li>Telegram: <a href="https://t.me/JOKERS_ARENA" target="_blank" rel="noopener noreferrer">t.me/JOKERS_ARENA</a></li>
            <li>Presale Wallet: jkrtQ5V9FpZw2wxzAVJx6SaNzfz6h9aZkv3HUdaS3B4</li>
            <li>Contract Address: jkercFfxVbfDtQUHRF7G6KKpGDEp3KjkBYrgESAjzJK</li>
            <li>Game: <a href="/game">Play Now</a></li>
            <li>Whitepaper: <a href="/whitepaper">Read More</a></li>
          </ul>
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
    <div className="plans-page" style={{ backgroundImage: `url(${plansBg})` }}>
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