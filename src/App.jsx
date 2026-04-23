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
};

const SECRET = 'sudo hire vasanth';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.BOOT);
  const keyBufferRef = useRef('');

  // Global easter egg listener
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter') {
        if (keyBufferRef.current.trim().toLowerCase() === SECRET) {
          setCurrentScreen(SCREENS.EASTEREGG);
        }
        keyBufferRef.current = '';
        return;
      }
      if (e.key === 'Backspace') {
        keyBufferRef.current = keyBufferRef.current.slice(0, -1);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        keyBufferRef.current += e.key;
        // Keep buffer from growing too large
        if (keyBufferRef.current.length > 30) {
          keyBufferRef.current = keyBufferRef.current.slice(-30);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
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
      default:
        return <MainMenu onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-terminal-bg font-mono text-terminal-green relative">
      <CRTOverlay />
      <div className="relative z-10">
        {renderScreen()}
      </div>
    </div>
  );
}
