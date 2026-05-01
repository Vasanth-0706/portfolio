import { useState, useEffect, useCallback } from 'react';
import BlinkingCursor from './BlinkingCursor';
import { bootLines as configBootLines, profile } from '../config';

const bootLines = configBootLines.map(line => ({ ...line, check: true }));
const BAR_CHAR_COUNT = 38;

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [typingLine, setTypingLine] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showHeader, setShowHeader] = useState(false);
  const [barProgress, setBarProgress] = useState(0);
  const [barsDone, setBarsDone] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [lineChecks, setLineChecks] = useState([]);
  const [uptime, setUptime] = useState(null);

  useEffect(() => {
    if (!showFooter) return;
    const dob = profile.dob;
    const calcUptime = () => {
      const now = new Date();
      let y = now.getFullYear() - dob.getFullYear();
      let mo = now.getMonth() - dob.getMonth();
      let d = now.getDate() - dob.getDate();
      let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
      if (d < 0) { mo--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
      if (mo < 0) { y--; mo += 12; }
      setUptime({ y, mo, d, h, m, s });
    };
    calcUptime();
    const id = setInterval(calcUptime, 1000);
    return () => clearInterval(id);
  }, [showFooter]);

  const typeText = useCallback((text, onDone) => {
    let i = 0;
    setTypingLine('');
    const interval = setInterval(() => {
      if (i < text.length) {
        setTypingLine(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        if (onDone) onDone();
      }
    }, 15 + Math.random() * 15);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowHeader(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showHeader || barsDone) return;
    if (barProgress < BAR_CHAR_COUNT) {
      const t = setTimeout(() => setBarProgress(prev => prev + 1), 15);
      return () => clearTimeout(t);
    } else {
      setBarsDone(true);
    }
  }, [showHeader, barProgress, barsDone]);

  useEffect(() => {
    if (!barsDone) return;
    const t = setTimeout(() => setCurrentIndex(0), 200);
    return () => clearTimeout(t);
  }, [barsDone]);

  useEffect(() => {
    if (currentIndex < 0 || currentIndex >= bootLines.length) return;
    const cleanup = typeText(bootLines[currentIndex].text, () => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, bootLines[currentIndex].text]);
        setLineChecks(prev => [...prev, true]);
        setTypingLine('');
        if (currentIndex < bootLines.length - 1) {
          setTimeout(() => setCurrentIndex(prev => prev + 1), 100);
        } else {
          setTimeout(() => setShowFooter(true), 300);
        }
      }, bootLines[currentIndex].delay);
    });
    return cleanup;
  }, [currentIndex, typeText]);

  useEffect(() => {
    if (!showFooter) return;
    const t = setTimeout(() => setShowPrompt(true), 500);
    return () => clearTimeout(t);
  }, [showFooter]);

  useEffect(() => {
    if (!showPrompt) return;
    const handleKey = (e) => {
      if (e.key === 'Enter') onComplete();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showPrompt, onComplete]);

  const topBarFill = '▀'.repeat(barProgress) + ' '.repeat(BAR_CHAR_COUNT - barProgress);
  const bottomBarFill = '▄'.repeat(barProgress) + ' '.repeat(BAR_CHAR_COUNT - barProgress);
  const topBar = `█${topBarFill}█`;
  const bottomBar = `█${bottomBarFill}█`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 screen-on">
      <div className="w-full max-w-2xl">
        {showHeader && (
          <div className="mb-6 transition-opacity duration-500 text-center">
            <p className="text-terminal-green text-glow text-sm sm:text-base font-mono whitespace-pre">
              {topBar}
            </p>
            {barsDone && (
              <>
                <p className="text-terminal-green text-glow text-sm sm:text-base">&nbsp;</p>
                <p className="text-terminal-white text-glow text-lg sm:text-xl font-bold">
                  vasanth.jar v1.0
                </p>
                <p className="text-terminal-dim text-sm sm:text-base mt-1">
                  Backend Runtime Environment
                </p>
                <p className="text-terminal-green text-glow text-sm sm:text-base">&nbsp;</p>
              </>
            )}
            <p className="text-terminal-green text-glow text-sm sm:text-base font-mono whitespace-pre">
              {bottomBar}
            </p>
          </div>
        )}

        <div className="space-y-1 font-mono text-sm sm:text-base">
          {visibleLines.map((line, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-terminal-green">{line}</span>
              {lineChecks[i] && (
                <span className="text-terminal-green text-glow ml-4">✓</span>
              )}
            </div>
          ))}
          {typingLine && (
            <div className="flex">
              <span className="text-terminal-green">{typingLine}</span>
              <BlinkingCursor />
            </div>
          )}
        </div>

        {showFooter && uptime && (
          <div className="mt-6 space-y-1 text-sm sm:text-base">
            <p className="text-terminal-green text-glow">
              &nbsp;&nbsp;All systems operational.
            </p>
            <p className="text-terminal-dim">
              &nbsp;&nbsp;Uptime: {uptime.y}y {uptime.mo}mo {uptime.d}d {String(uptime.h).padStart(2,'0')}:{String(uptime.m).padStart(2,'0')}:{String(uptime.s).padStart(2,'0')}
            </p>
          </div>
        )}

        {showPrompt && (
          <div className="mt-6 text-sm sm:text-base cursor-pointer" onClick={onComplete}>
            <span className="text-terminal-amber">&gt; Press [ENTER] to continue</span>
            <BlinkingCursor />
          </div>
        )}
      </div>
    </div>
  );
}
