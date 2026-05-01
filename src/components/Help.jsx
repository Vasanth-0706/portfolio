import { useState, useEffect } from 'react';
import BlinkingCursor from './BlinkingCursor';
import { showExperience } from '../config';

const helpLines = [
  { cmd: 'whoami', desc: 'Who is Vasanth?' },
  { cmd: 'ls skills/', desc: 'View technical skills' },
  { cmd: 'ls projects/', desc: 'Browse projects' },
  ...(showExperience ? [{ cmd: 'cat experience.log', desc: 'Work experience' }] : []),
  { cmd: 'cat academics.log', desc: 'Education history' },
  { cmd: 'cat certifications.log', desc: 'Certifications & badges' },
  { cmd: './contact.sh', desc: 'Get in touch' },
  { cmd: '───────────────', desc: '────────────────────────' },
  { cmd: 'help', desc: 'Show this help menu' },
  { cmd: 'sudo hire vasanth', desc: '???' },
];

export default function Help({ onBack }) {
  const [showCommand, setShowCommand] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCommand(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showCommand) return;
    if (visibleLines < helpLines.length) {
      const t = setTimeout(() => setVisibleLines(prev => prev + 1), 120);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowCursor(true), 300);
      return () => clearTimeout(t);
    }
  }, [showCommand, visibleLines]);

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
            &gt; help
          </p>
        )}

        <div className="ml-2 sm:ml-4 mb-2">
          {showCommand && (
            <p className="text-terminal-dim text-xs sm:text-sm mb-4">
              Available commands:
            </p>
          )}
          <div className="space-y-2">
            {helpLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="flex text-sm sm:text-base">
                <span className="text-terminal-cyan w-52 sm:w-60 shrink-0 font-bold">
                  {line.cmd}
                </span>
                <span className="text-terminal-dim">
                  {line.desc}
                </span>
              </div>
            ))}
          </div>
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
