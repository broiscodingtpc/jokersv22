import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import PlansPage from './pages/PlansPage';
import WhitepaperPage from './pages/WhitepaperPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/whitepaper" element={<WhitepaperPage />} />
      </Routes>
    </Router>
  );
}

export default App; 