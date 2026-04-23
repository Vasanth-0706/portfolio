import { useState, useEffect } from 'react';
import BlinkingCursor from './BlinkingCursor';
import { skillCategories } from '../config';

function ProgressBar({ level, animate }) {
  const filled = Math.round(level / 10);
  const empty = 10 - filled;
  return (
    <span className="inline-flex items-center text-xs sm:text-sm">
      <span className="text-terminal-dim">[</span>
      <span
        className={`text-terminal-cyan transition-all duration-1000 ${animate ? '' : 'opacity-0'}`}
        style={{ transitionDelay: '200ms' }}
      >
        {'█'.repeat(animate ? filled : 0)}
      </span>
      <span className="text-terminal-border">
        {'░'.repeat(animate ? empty : 10)}
      </span>
      <span className="text-terminal-dim">]</span>
      <span className="text-terminal-amber ml-2">{level}%</span>
    </span>
  );
}

export default function Skills({ onBack }) {
  const [showCommand, setShowCommand] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState(0);
  const [animateBars, setAnimateBars] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCommand(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showCommand) return;
    if (visibleCategories < skillCategories.length) {
      const t = setTimeout(() => setVisibleCategories(prev => prev + 1), 500);
      return () => clearTimeout(t);
    } else {
      setTimeout(() => setAnimateBars(true), 300);
      const t = setTimeout(() => setShowCursor(true), 800);
      return () => clearTimeout(t);
    }
  }, [showCommand, visibleCategories]);

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
            &gt; ls skills/
          </p>
        )}

        <div className="space-y-5 ml-2 sm:ml-4">
          {skillCategories.slice(0, visibleCategories).map((cat, ci) => (
            <div key={ci}>
              <p className="text-terminal-white text-xs sm:text-sm font-bold mb-2">
                {cat.name}
              </p>
              {cat.skills.map((skill, si) => {
                const isLast = si === cat.skills.length - 1;
                const prefix = isLast ? '└── ' : '├── ';
                return (
                  <div
                    key={si}
                    className="flex flex-col sm:flex-row sm:items-center text-sm sm:text-base mb-1"
                  >
                    <span className="text-terminal-dim shrink-0">
                      {prefix}
                    </span>
                    <span className="text-terminal-green w-28 sm:w-32 shrink-0">
                      {skill.name}
                    </span>
                    <ProgressBar level={skill.level} animate={animateBars} />
                  </div>
                );
              })}
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
