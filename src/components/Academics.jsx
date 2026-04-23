import { useState, useEffect } from 'react';
import BlinkingCursor from './BlinkingCursor';
import { academics as sections } from '../config';

export default function Academics({ onBack }) {
  const [showCommand, setShowCommand] = useState(false);
  const [visibleSections, setVisibleSections] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCommand(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showCommand) return;
    if (visibleSections < sections.length) {
      const t = setTimeout(() => setVisibleSections(prev => prev + 1), 600);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowCursor(true), 400);
      return () => clearTimeout(t);
    }
  }, [showCommand, visibleSections]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onBack]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {showCommand && (
          <p className="text-terminal-green text-sm sm:text-base mb-6 text-glow">
            &gt; cat academics.log
          </p>
        )}

        <div className="space-y-6 ml-2 sm:ml-4">
          {sections.slice(0, visibleSections).map((section, si) => (
            <div key={si}>
              <p className="text-terminal-cyan font-bold text-sm sm:text-base mb-2">
                [{section.tag}]
              </p>
              <div className="space-y-1 ml-2">
                {section.lines.map((line, li) => (
                  <p key={li} className={`${line.color} text-sm sm:text-base`}>
                    {line.text}
                  </p>
                ))}
              </div>
              <p className="text-terminal-border text-sm sm:text-base mt-3">
                ─────────────────────────────────────
              </p>
            </div>
          ))}
        </div>

        {showCursor && (
          <div className="mt-8">
            <span className="text-terminal-green text-sm sm:text-base">&gt; </span>
            <BlinkingCursor />
            <p
              className="text-terminal-dim text-xs mt-4 cursor-pointer hover:text-terminal-green transition-colors"
              onClick={onBack}
            >
              [ESC] Back to menu
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
