import { useState, useCallback, useEffect, useRef } from 'react';
import CRTOverlay from './components/CRTOverlay';
import BootSequence from './components/BootSequence';
import MainMenu from './components/MainMenu';
import WhoAmI from './components/WhoAmI';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Academics from './components/Academics';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Experience from './components/Experience';
import EasterEgg from './components/EasterEgg';
import Help from './components/Help';

const SCREENS = {
  BOOT: 'boot',
  MENU: 'menu',
  WHOAMI: 'whoami',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  ACADEMICS: 'academics',
  CERTIFICATIONS: 'certifications',
  ACHIEVEMENTS: 'achievements',
  CONTACT: 'contact',
  EXPERIENCE: 'experience',
  EASTEREGG: 'easteregg',
  HELP: 'help',
};

const SECRET = 'sudo hire vasanth';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.BOOT);
  const keyBufferRef = useRef('');
  const containerRef = useRef(null);

  // Auto-focus container on mount, screen changes, and clicks
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [currentScreen]);

  const handleContainerClick = () => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  };

  // Global easter egg listener — single window listener with capture phase
  useEffect(() => {
    let lastEventTime = 0;
    const handleKey = (e) => {
      // Dedup guard: ignore if same event fires within 10ms (prevents double-fire)
      const now = Date.now();
      if (now - lastEventTime < 10) return;
      lastEventTime = now;

      if (e.key === 'Enter') {
        const typed = keyBufferRef.current.trim().toLowerCase();
        if (typed === SECRET) {
          setCurrentScreen(SCREENS.EASTEREGG);
        } else if (typed === 'help') {
          setCurrentScreen(SCREENS.HELP);
        }
        keyBufferRef.current = '';
        return;
      }
      if (e.key === 'Backspace') {
        keyBufferRef.current = keyBufferRef.current.slice(0, -1);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        keyBufferRef.current += e.key;
        if (keyBufferRef.current.length > 30) {
          keyBufferRef.current = keyBufferRef.current.slice(-30);
        }
      }
    };
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, []);

  const handleBootComplete = useCallback(() => {
    setCurrentScreen(SCREENS.MENU);
  }, []);

  const handleNavigate = useCallback((screen) => {
    setCurrentScreen(screen);
  }, []);

  const handleBack = useCallback(() => {
    setCurrentScreen(SCREENS.MENU);
  }, []);

  const handleEasterEggComplete = useCallback(() => {
    setCurrentScreen(SCREENS.MENU);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.BOOT:
        return <BootSequence onComplete={handleBootComplete} />;
      case SCREENS.MENU:
        return <MainMenu onNavigate={handleNavigate} />;
      case SCREENS.WHOAMI:
        return <WhoAmI onBack={handleBack} />;
      case SCREENS.SKILLS:
        return <Skills onBack={handleBack} />;
      case SCREENS.PROJECTS:
        return <Projects onBack={handleBack} />;
      case SCREENS.ACADEMICS:
        return <Academics onBack={handleBack} />;
      case SCREENS.CERTIFICATIONS:
        return <Certifications onBack={handleBack} />;
      case SCREENS.ACHIEVEMENTS:
        return <Achievements onBack={handleBack} />;
      case SCREENS.CONTACT:
        return <Contact onBack={handleBack} />;
      case SCREENS.EXPERIENCE:
        return <Experience onBack={handleBack} />;
      case SCREENS.EASTEREGG:
        return <EasterEgg onComplete={handleEasterEggComplete} />;
      case SCREENS.HELP:
        return <Help onBack={handleBack} />;
      default:
        return <MainMenu onNavigate={handleNavigate} />;
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onClick={handleContainerClick}
      className="min-h-screen bg-terminal-bg font-mono text-terminal-green relative outline-none"
      style={{ outline: 'none' }}
    >
      <CRTOverlay />
      <div className="relative z-10">
        {renderScreen()}
      </div>
    </div>
  );
}
