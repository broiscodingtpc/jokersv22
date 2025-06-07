import { useState } from "react";
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

export default function GamePage() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(10000);
  const [bet, setBet] = useState(0);
  const [jokerImage, setJokerImage] = useState(jokerIdle);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastPlayTime, setLastPlayTime] = useState(0);
  const COOLDOWN_TIME = 2000; // 2 seconds cooldown between plays

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
    setTimeout(() => setPopupMessage(''), 3000);
  };

  const handlePlay = () => {
    const now = Date.now();
    
    // Prevent rapid clicking
    if (isProcessing || now - lastPlayTime < COOLDOWN_TIME) {
      return;
    }

    if (bet <= 0 || bet > balance) {
      showPopup('noMoney');
      return;
    }
    
    setIsProcessing(true);
    setLastPlayTime(now);
    setIsLoading(true);
    
    // Simulate server delay for security
    setTimeout(() => {
      const didWin = Math.random() < 0.5;
      setBalance((prev) => prev + (didWin ? bet : -bet));
      setResult(didWin ? 'win' : 'lose');
      setShowResult(true);
      setIsLoading(false);
      showPopup(didWin ? 'win' : 'lose');
      
      setTimeout(() => {
        setShowResult(false);
        setResult(null);
        setIsProcessing(false);
      }, 2000);
    }, 1500);
  };

  const resetGame = () => {
    if (isProcessing) return;
    
    setBalance(10000);
    setBet(0);
    setJokerImage(jokerIdle);
    setShowResult(false);
    setResult(null);
    showPopup('reset');
  };

  // Prevent context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className="game-container prevent-context" 
      onContextMenu={handleContextMenu}
    >
      <button className="back-to-home" onClick={() => navigate('/')}>
        <img src={backToHome} alt="Back to Home" />
      </button>
      <div className="game-header">
        <h1 className="no-select">JOKER'S ARENA</h1>
        <div className="balance no-select">
          Balance: <strong>{balance} $JOKER</strong>
        </div>
      </div>

      <div className="game-content">
        <img 
          src={jokerImage} 
          alt="Joker" 
          className="joker-image no-select" 
          draggable="false"
        />
        
        <div className="bet-buttons">
          {[100, 500, 1000].map((amount) => (
            <button
              key={amount}
              className={`bet-btn ${bet === amount ? 'active' : ''} ${isProcessing ? 'interaction-disabled' : ''}`}
              onClick={() => !isProcessing && setBet(amount)}
              disabled={isProcessing}
            >
              BET {amount}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '300px', margin: '20px auto', height: '80px' }}>
          <button
            className={`fight-button ${isProcessing ? 'interaction-disabled' : ''}`}
            onClick={handlePlay}
            disabled={bet <= 0 || bet > balance || showResult || isLoading || isProcessing}
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
                draggable="false"
              />
            </div>
          )}
        </div>

        <button 
          className={`reset-btn ${isProcessing ? 'interaction-disabled' : ''}`}
          onClick={resetGame}
          disabled={isProcessing}
        >
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
        <div className="funny-popup no-select">
          {popupMessage}
        </div>
      )}
    </div>
  );
} 