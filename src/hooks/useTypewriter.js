import { useState, useEffect, useRef, useCallback } from 'react';

export function useTypewriter(lines, options = {}) {
  const {
    charDelay = 30,
    lineDelay = 400,
    startDelay = 0,
    autoStart = true,
    onComplete = null,
  } = options;

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);
  const timeoutRef = useRef(null);

  const start = useCallback(() => {
    setStarted(true);
    setIsTyping(true);
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (autoStart && !started) {
      const t = setTimeout(() => start(), startDelay);
      return () => clearTimeout(t);
    }
  }, [autoStart, startDelay, start, started]);

  useEffect(() => {
    if (!isTyping || !started) return;

    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      setIsComplete(true);
      if (onComplete) onComplete();
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex <= currentLine.length) {
      const variation = Math.random() * 40 - 20;
      const delay = currentCharIndex === 0 ? lineDelay : Math.max(10, charDelay + variation);

      timeoutRef.current = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex);
          return newLines;
        });

        if (currentCharIndex < currentLine.length) {
          setCurrentCharIndex(prev => prev + 1);
        } else {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }
      }, delay);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isTyping, started, currentLineIndex, currentCharIndex, lines, charDelay, lineDelay, onComplete]);

  return { displayedLines, isTyping, isComplete, start, currentLineIndex };
}

export function useSequentialType(text, options = {}) {
  const { charDelay = 30, startDelay = 0, autoStart = true, onComplete = null } = options;
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);
  const indexRef = useRef(0);

  const start = useCallback(() => {
    setStarted(true);
    setDisplayed('');
    indexRef.current = 0;
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (autoStart && !started) {
      const t = setTimeout(() => start(), startDelay);
      return () => clearTimeout(t);
    }
  }, [autoStart, startDelay, start, started]);

  useEffect(() => {
    if (!started || isComplete) return;

    if (indexRef.current >= text.length) {
      setIsComplete(true);
      if (onComplete) onComplete();
      return;
    }

    const variation = Math.random() * 30 - 15;
    const delay = Math.max(10, charDelay + variation);

    const t = setTimeout(() => {
      indexRef.current += 1;
      setDisplayed(text.substring(0, indexRef.current));
    }, delay);

    return () => clearTimeout(t);
  }, [started, displayed, text, charDelay, isComplete, onComplete]);

  return { displayed, isComplete, start };
}
