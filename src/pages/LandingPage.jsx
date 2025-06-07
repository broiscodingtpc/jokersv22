import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgVideo from '../assets/bg intro.mp4';
import '../styles/App.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [jokeUsed, setJokeUsed] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [jokeText, setJokeText] = useState('');
  const [buttonTexts] = useState({
    x: [
      "Follow the madness?",
      "Join the chaos?",
      "Ready to lose?",
      "Feeling lucky?",
      "Want some fun?",
      "Dare to enter?",
      "Ready to play?",
      "Join the game?",
      "Want to win?",
      "Feeling brave?"
    ],
    telegram: [
      "Join the madness?",
      "Enter the chaos?",
      "Ready to lose?",
      "Feeling lucky?",
      "Want some fun?",
      "Dare to enter?",
      "Ready to play?",
      "Join the game?",
      "Want to win?",
      "Feeling brave?"
    ],
    plans: [
      "Check the masterplan?",
      "See the future?",
      "Ready to lose?",
      "Feeling lucky?",
      "Want some fun?",
      "Dare to enter?",
      "Ready to play?",
      "Join the game?",
      "Want to win?",
      "Feeling brave?"
    ],
    whitepaper: [
      "Read the rules?",
      "Learn the game?",
      "Ready to lose?",
      "Feeling lucky?",
      "Want some fun?",
      "Dare to enter?",
      "Ready to play?",
      "Join the game?",
      "Want to win?",
      "Feeling brave?"
    ],
    game: [
      "Enter the arena?",
      "Start the game?",
      "Ready to lose?",
      "Feeling lucky?",
      "Want some fun?",
      "Dare to enter?",
      "Ready to play?",
      "Join the game?",
      "Want to win?",
      "Feeling brave?"
    ]
  });

  const jokeTexts = [
    "Catch me if you can!",
    "Not so fast!",
    "Missed me!",
    "Try again!",
    "Too slow!",
    "Almost got me!",
    "Better luck next time!",
    "You'll never catch me!",
    "Too easy!",
    "Is that all you got?"
  ];

  const handleButtonHover = (buttonId) => {
    if (!jokeUsed) {
      setActiveButton(buttonId);
    }
  };

  const handleButtonClick = (buttonId, action) => {
    if (activeButton === buttonId && !jokeUsed) {
      setJokeUsed(true);
      setJokeText(jokeTexts[Math.floor(Math.random() * jokeTexts.length)]);
      const button = document.getElementById(buttonId);
      if (button) {
        button.classList.add('joke-button');
        setTimeout(() => {
          button.classList.remove('joke-button');
          setJokeText('');
          action();
        }, 2000);
      }
    } else {
      action();
    }
  };

  return (
    <div className="landing-page">
      <video className="landing-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="overlay-content">
        <div className="landing-container">
          <h1>JOKER'S ARENA</h1>
          <div className="buttons">
            <button
              id="x-button"
              className="nav-btn"
              onMouseEnter={() => handleButtonHover('x-button')}
              onClick={() => handleButtonClick('x-button', () => window.open('https://x.com/JOKERS_ON_SOL', '_blank'))}
            >
              <span className="btn-content">𝕏</span>
            </button>
            <button
              id="telegram-button"
              className="nav-btn"
              onMouseEnter={() => handleButtonHover('telegram-button')}
              onClick={() => handleButtonClick('telegram-button', () => window.open('https://t.me/JOKERS_ARENA', '_blank'))}
            >
              <span className="btn-content">TELEGRAM</span>
            </button>
            <button
              id="plans-button"
              className="nav-btn"
              onMouseEnter={() => handleButtonHover('plans-button')}
              onClick={() => handleButtonClick('plans-button', () => navigate('/plans'))}
            >
              <span className="btn-content">PLANS</span>
            </button>
            <button
              id="whitepaper-button"
              className="nav-btn"
              onMouseEnter={() => handleButtonHover('whitepaper-button')}
              onClick={() => handleButtonClick('whitepaper-button', () => navigate('/whitepaper'))}
            >
              <span className="btn-content">WHITEPAPER</span>
            </button>
            <button
              id="game-button"
              className="nav-btn"
              onMouseEnter={() => handleButtonHover('game-button')}
              onClick={() => handleButtonClick('game-button', () => navigate('/game'))}
            >
              <span className="btn-content">PLAY GAME</span>
            </button>
          </div>
          <div className="random-texts">
            <span className="random-text x-text">{buttonTexts.x[Math.floor(Math.random() * buttonTexts.x.length)]}</span>
            <span className="random-text telegram-text">{buttonTexts.telegram[Math.floor(Math.random() * buttonTexts.telegram.length)]}</span>
            <span className="random-text plans-text">{buttonTexts.plans[Math.floor(Math.random() * buttonTexts.plans.length)]}</span>
            <span className="random-text whitepaper-text">{buttonTexts.whitepaper[Math.floor(Math.random() * buttonTexts.whitepaper.length)]}</span>
            <span className="random-text game-text">{buttonTexts.game[Math.floor(Math.random() * buttonTexts.game.length)]}</span>
          </div>
          {jokeText && <div className="joke-text">{jokeText}</div>}
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 