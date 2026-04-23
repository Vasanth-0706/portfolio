import { useState, useEffect } from 'react';
import BlinkingCursor from './BlinkingCursor';
import { profile } from '../config';

const asciiArt = [
  ' ██╗   ██╗██╗  ██╗',
  ' ██║   ██║██║ ██╔╝',
  ' ██║   ██║█████╔╝ ',
  ' ╚██╗ ██╔╝██╔═██╗ ',
  '  ╚████╔╝ ██║  ██╗',
  '   ╚═══╝  ╚═╝  ╚═╝',
];

const profileLines = [
  { label: 'Name', value: profile.name, color: 'text-terminal-white' },
  { label: 'Role', value: profile.role, color: 'text-terminal-white' },
  { label: 'Stack', value: profile.stack, color: 'text-terminal-cyan' },
  { label: 'Status', value: profile.status, color: 'text-terminal-green' },
];

const separator = '─────────────────────────────';

export default function WhoAmI({ onBack }) {
  const [showCommand, setShowCommand] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCommand(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showCommand) return;
    const t = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(t);
  }, [showCommand]);

  useEffect(() => {
    if (!showContent) return;
    if (visibleLines < profileLines.length) {
      const t = setTimeout(() => setVisibleLines(prev => prev + 1), 350);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowCursor(true), 400);
      return () => clearTimeout(t);
    }
  }, [showContent, visibleLines]);

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
      <div className="w-full max-w-3xl">
        {showCommand && (
          <p className="text-terminal-green text-sm sm:text-base mb-6 text-glow">
            &gt; whoami
          </p>
        )}

        {showContent && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 ml-2 sm:ml-4">
            <div className="shrink-0">
              {asciiArt.map((line, i) => (
                <pre key={i} className="text-terminal-green text-glow text-xs sm:text-sm leading-tight">
                  {line}
                </pre>
              ))}
              <p className="text-terminal-border text-xs sm:text-sm mt-2">{separator}</p>
            </div>

            <div className="space-y-2 flex-1">
              {profileLines.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="flex text-sm sm:text-base">
                  <span className="text-terminal-dim w-20 sm:w-24 shrink-0">
                    {line.label}
                  </span>
                  <span className="text-terminal-dim mr-2">:</span>
                  <span className={`${line.color} text-glow`}>
                    {line.value}
                  </span>
                </div>
              ))}
              {visibleLines >= profileLines.length && (
                <p className="text-terminal-border text-xs sm:text-sm mt-2">{separator}</p>
              )}
            </div>
          </div>
        )}

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
