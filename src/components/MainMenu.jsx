import { useState, useEffect, useMemo } from 'react';
import BlinkingCursor from './BlinkingCursor';
import { menuHeader, showExperience } from '../config';

function buildMenuItems() {
  const items = [
    { label: 'whoami', screen: 'whoami' },
    { label: 'ls skills/', screen: 'skills' },
    { label: 'ls projects/', screen: 'projects' },
  ];
  if (showExperience) {
    items.push({ label: 'cat experience.log', screen: 'experience' });
  }
  items.push(
    { label: 'cat academics.log', screen: 'academics' },
    { label: 'cat certifications.log', screen: 'certifications' },
    { label: './contact.sh', screen: 'contact' },
  );
  return items.map((item, i) => ({ ...item, key: String(i + 1) }));
}


export default function MainMenu({ onNavigate }) {
  const menuItems = useMemo(() => buildMenuItems(), []);
  const [showHeader, setShowHeader] = useState(false);
  const [visibleItems, setVisibleItems] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setShowHeader(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showHeader) return;
    if (visibleItems < menuItems.length) {
      const t = setTimeout(() => setVisibleItems(prev => prev + 1), 300);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowCursor(true), 400);
      return () => clearTimeout(t);
    }
  }, [showHeader, visibleItems]);

  useEffect(() => {
    const handleKey = (e) => {
      const item = menuItems.find(m => m.key === e.key);
      if (item) {
        setInputText(e.key);
        setTimeout(() => onNavigate(item.screen), 200);
        return;
      }
      if (e.key === 'Backspace') {
        setInputText(prev => prev.slice(0, -1));
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        setInputText(prev => prev + e.key);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onNavigate]);

  return (
    <div className="h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-2xl">
        {showHeader && (
          <div className="mb-8 text-center">
            <p className="text-terminal-dim text-sm sm:text-base">
              ══════════════════════════════════════
            </p>
            <p className="text-terminal-white text-glow text-lg sm:text-xl font-bold mt-2">
              {menuHeader.title}
            </p>
            {menuHeader.subtitle && (
              <p className="text-terminal-dim text-sm sm:text-base mt-1">
                {menuHeader.subtitle}
              </p>
            )}
            <p className="text-terminal-dim text-sm sm:text-base mt-2">
              ══════════════════════════════════════
            </p>
          </div>
        )}

        <div className="space-y-3 ml-2 sm:ml-4">
          {menuItems.slice(0, visibleItems).map((item) => (
            <div
              key={item.key}
              onClick={() => {
                setInputText(item.key);
                setTimeout(() => onNavigate(item.screen), 200);
              }}
              className="cursor-pointer group flex items-center text-sm sm:text-base transition-all duration-200 hover:translate-x-2"
            >
              <span className="text-terminal-cyan font-bold mr-3">
                [{item.key}]
              </span>
              <span className="text-terminal-green group-hover:text-terminal-white group-hover:text-glow transition-colors duration-200">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {showCursor && (
          <div className="mt-8 ml-2 sm:ml-4 text-sm sm:text-base">
            <span className="text-terminal-green">&gt; </span>
            <span className="text-terminal-white">{inputText}</span>
            <BlinkingCursor />
          </div>
        )}
      </div>
    </div>
  );
}
