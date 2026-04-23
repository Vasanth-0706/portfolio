import { useState, useEffect } from 'react';
import BlinkingCursor from './BlinkingCursor';
import { contact } from '../config';

const contactLines = [
  { icon: '📧', label: contact.email, href: `mailto:${contact.email}` },
  { icon: '💼', label: contact.linkedin.label, href: contact.linkedin.url },
  { icon: '🐙', label: contact.github.label, href: contact.github.url },
];

export default function Contact({ onBack }) {
  const [showCommand, setShowCommand] = useState(false);
  const [showConnecting, setShowConnecting] = useState(false);
  const [visibleContacts, setVisibleContacts] = useState(0);
  const [showResume, setShowResume] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCommand(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showCommand) return;
    const t = setTimeout(() => setShowConnecting(true), 300);
    return () => clearTimeout(t);
  }, [showCommand]);

  useEffect(() => {
    if (!showConnecting) return;
    if (visibleContacts < contactLines.length) {
      const t = setTimeout(() => setVisibleContacts(prev => prev + 1), 400);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowResume(true), 600);
      return () => clearTimeout(t);
    }
  }, [showConnecting, visibleContacts]);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloaded(true);
      setDownloading(false);
      setTimeout(() => setShowFooter(true), 500);
      setTimeout(() => setShowCursor(true), 1000);
      window.open(contact.resumeUrl, '_blank');
    }, 1200);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        onBack();
      }
      if (showResume && !downloading && !downloaded) {
        if (e.key === 'y' || e.key === 'Y' || e.key === 'Enter') {
          handleDownload();
        }
        if (e.key === 'n' || e.key === 'N') {
          setShowFooter(true);
          setTimeout(() => setShowCursor(true), 500);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onBack, showResume, downloading, downloaded]);

  const resumeName = 'vasanth_resume.pdf';

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {showCommand && (
          <p className="text-terminal-green text-sm sm:text-base mb-4 text-glow">
            &gt; ./contact.sh
          </p>
        )}

        {showConnecting && (
          <p className="text-terminal-dim text-sm sm:text-base mb-6 ml-2 sm:ml-4">
            Establishing connection...
          </p>
        )}

        <div className="space-y-3 ml-2 sm:ml-4">
          {contactLines.slice(0, visibleContacts).map((c, i) => (
            <div key={i} className="flex items-center text-sm sm:text-base">
              <span className="mr-3">{c.icon}</span>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-cyan hover:text-terminal-white transition-colors underline decoration-terminal-border hover:decoration-terminal-cyan"
              >
                {c.label}
              </a>
            </div>
          ))}
        </div>

        {showResume && !downloaded && (
          <div className="mt-6 ml-2 sm:ml-4 text-sm sm:text-base">
            <div className="flex items-center">
              <span className="text-terminal-green">&gt; Download Resume?</span>
              <span className="text-terminal-dim ml-2">[Y/n]</span>
              {!downloading && (
                <span
                  onClick={handleDownload}
                  className="text-terminal-amber ml-3 cursor-pointer hover:text-terminal-white transition-colors"
                >
                  Y
                </span>
              )}
            </div>
            {downloading && (
              <p className="text-terminal-dim mt-2 ml-2">
                Fetching {resumeName}...
              </p>
            )}
          </div>
        )}

        {downloaded && (
          <div className="mt-6 ml-2 sm:ml-4 text-sm sm:text-base">
            <p className="text-terminal-green">
              &gt; Download Resume? [Y/n] Y
            </p>
            <p className="text-terminal-dim mt-1 ml-2">
              Fetching {resumeName}... <span className="text-terminal-green">✓</span>
            </p>
            <p className="text-terminal-green ml-2">
              Download started.
            </p>
          </div>
        )}

        {showFooter && (
          <div className="mt-6 ml-2 sm:ml-4 text-sm sm:text-base">
            <p className="text-terminal-dim border-t border-terminal-border pt-4">
              -- Thanks for visiting. Let's build something. --
            </p>
          </div>
        )}

        {showCursor && (
          <div className="mt-6">
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
