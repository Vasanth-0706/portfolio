import { useState, useEffect } from 'react';
import BlinkingCursor from './BlinkingCursor';
import { certifications } from '../config';

export default function Certifications({ onBack }) {
  const [showCommand, setShowCommand] = useState(false);
  const [visibleCerts, setVisibleCerts] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCommand(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showCommand) return;
    if (visibleCerts < certifications.length) {
      const t = setTimeout(() => setVisibleCerts(prev => prev + 1), 500);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowCursor(true), 400);
      return () => clearTimeout(t);
    }
  }, [showCommand, visibleCerts]);

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
            &gt; cat certifications.log
          </p>
        )}

        <div className="space-y-6 ml-2 sm:ml-4">
          {certifications.slice(0, visibleCerts).map((cert, i) => (
            <div key={i}>
              <p className="text-terminal-cyan font-bold text-sm sm:text-base mb-3">
                [{cert.name}]
              </p>
              <div className="space-y-2 ml-2 text-sm sm:text-base">
                <div className="flex">
                  <span className="text-terminal-dim w-20 sm:w-24 shrink-0">Issuer</span>
                  <span className="text-terminal-dim mr-2">:</span>
                  <span className="text-terminal-white">{cert.issuer}</span>
                </div>
                <div className="flex">
                  <span className="text-terminal-dim w-20 sm:w-24 shrink-0">Issued</span>
                  <span className="text-terminal-dim mr-2">:</span>
                  <span className="text-terminal-green">{cert.issued}</span>
                </div>
                <div className="flex">
                  <span className="text-terminal-dim w-20 sm:w-24 shrink-0">Expires</span>
                  <span className="text-terminal-dim mr-2">:</span>
                  <span className="text-terminal-green">{cert.expires}</span>
                </div>
                <div className="flex">
                  <span className="text-terminal-dim w-20 sm:w-24 shrink-0">Status</span>
                  <span className="text-terminal-dim mr-2">:</span>
                  <span className="text-terminal-green text-glow">{cert.status}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-dim w-20 sm:w-24 shrink-0">Verify</span>
                  <span className="text-terminal-dim mr-2">:</span>
                  <a
                    href={cert.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-amber slow-blink cursor-pointer hover:text-terminal-white transition-colors font-bold"
                  >
                    ⚡ Click Me!
                  </a>
                </div>
              </div>
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
