import { useState, useEffect } from 'react';
import BlinkingCursor from './BlinkingCursor';

export default function EasterEgg({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0);

  const lines = [
    { text: '> sudo hire vasanth', color: 'text-terminal-green', delay: 0 },
    { text: '', color: '', delay: 500 },
    { text: '[sudo] password for recruiter: ********', color: 'text-terminal-dim', delay: 800 },
    { text: '', color: '', delay: 400 },
    { text: '✓ Permission granted.', color: 'text-terminal-green text-glow', delay: 600 },
    { text: '> Initiating offer letter...', color: 'text-terminal-amber', delay: 800 },
    { text: '> Compiling benefits package...  ✓', color: 'text-terminal-green', delay: 600 },
    { text: '> Sending to vasanth@inbox...    ✓', color: 'text-terminal-green', delay: 500 },
    { text: '', color: '', delay: 400 },
    { text: '🎉 Best decision you\'ll make today.', color: 'text-terminal-white text-glow text-lg', delay: 0 },
  ];

  useEffect(() => {
    if (visibleLines < lines.length) {
      const t = setTimeout(
        () => setVisibleLines(prev => prev + 1),
        lines[visibleLines]?.delay || 500
      );
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => onComplete(), 3000);
      return () => clearTimeout(t);
    }
  }, [visibleLines, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-2">
        {lines.slice(0, visibleLines).map((line, i) => (
          <p key={i} className={`${line.color} text-sm sm:text-base`}>
            {line.text || '\u00A0'}
          </p>
        ))}
        {visibleLines < lines.length && (
          <div>
            <BlinkingCursor />
          </div>
        )}
      </div>
    </div>
  );
}
