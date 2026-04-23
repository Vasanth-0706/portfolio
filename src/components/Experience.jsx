import { useState, useEffect } from 'react';
import BlinkingCursor from './BlinkingCursor';
import { experience } from '../config';

export default function Experience({ onBack }) {
  const [showCommand, setShowCommand] = useState(false);
  const [visibleEntries, setVisibleEntries] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCommand(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showCommand) return;
    if (visibleEntries < experience.length) {
      const t = setTimeout(() => setVisibleEntries(prev => prev + 1), 600);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowCursor(true), 400);
      return () => clearTimeout(t);
    }
  }, [showCommand, visibleEntries]);

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
            &gt; cat experience.log
          </p>
        )}

        <div className="space-y-6 ml-2 sm:ml-4">
          {experience.slice(0, visibleEntries).map((exp, i) => (
            <div key={i}>
              <p className="text-terminal-cyan font-bold text-sm sm:text-base mb-2">
                [{exp.company}]
              </p>
              <div className="space-y-2 ml-2 text-sm sm:text-base">
                <div className="flex">
                  <span className="text-terminal-dim w-24 shrink-0">Role</span>
                  <span className="text-terminal-dim mr-2">:</span>
                  <span className="text-terminal-white">{exp.role}</span>
                </div>
                <div className="flex">
                  <span className="text-terminal-dim w-24 shrink-0">Duration</span>
                  <span className="text-terminal-dim mr-2">:</span>
                  <span className="text-terminal-green">{exp.duration}</span>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <span className="text-terminal-dim w-24 shrink-0">Work</span>
                  <span className="text-terminal-dim mr-2 hidden sm:inline">:</span>
                  <span className="text-terminal-green whitespace-pre-line">{exp.work}</span>
                </div>
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
