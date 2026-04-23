import { useState, useEffect } from 'react';
import BlinkingCursor from './BlinkingCursor';
import { achievements as staticAchievements, leetcode } from '../config';

export default function Achievements({ onBack }) {
  const [showCommand, setShowCommand] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [achievements, setAchievements] = useState(staticAchievements);
  const [leetcodeLoaded, setLeetcodeLoaded] = useState(false);

  useEffect(() => {
    const query = `{
      userContestRanking(username: "${leetcode.username}") { rating attendedContestsCount }
      matchedUser(username: "${leetcode.username}") {
        submitStats: submitStatsGlobal { acSubmissionNum { difficulty count } }
      }
    }`;

    fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
      .then(res => res.json())
      .then(data => {
        const rating = Math.round(data.data.userContestRanking?.rating || 0);
        const solved = data.data.matchedUser?.submitStats?.acSubmissionNum?.[0]?.count || 0;
        const contests = data.data.userContestRanking?.attendedContestsCount || 0;

        const leetcodeEntries = [
          { year: 'LIVE', text: `LeetCode Rating → ${rating} (${contests} contests)` },
          { year: 'LIVE', text: `LeetCode Problems Solved → ${solved}` },
        ];

        setAchievements([...staticAchievements, ...leetcodeEntries]);
        setLeetcodeLoaded(true);
      })
      .catch(() => {
        setAchievements([...staticAchievements, { year: '2024', text: 'LeetCode Rating → 1513' }]);
        setLeetcodeLoaded(true);
      });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowCommand(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showCommand) return;
    if (visibleLines < achievements.length) {
      const t = setTimeout(() => setVisibleLines(prev => prev + 1), 450);
      return () => clearTimeout(t);
    } else if (leetcodeLoaded || visibleLines >= staticAchievements.length) {
      const t = setTimeout(() => setShowCursor(true), 400);
      return () => clearTimeout(t);
    }
  }, [showCommand, visibleLines, achievements.length, leetcodeLoaded]);

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
            &gt; cat achievements.log
          </p>
        )}

        <div className="space-y-3 ml-2 sm:ml-4">
          {achievements.slice(0, visibleLines).map((ach, i) => (
            <div key={i} className="flex items-start text-sm sm:text-base">
              <span className={`font-bold mr-3 shrink-0 ${ach.year === 'LIVE' ? 'text-terminal-amber' : 'text-terminal-cyan'}`}>
                [{ach.year}]
              </span>
              <span className={ach.year === 'LIVE' ? 'text-terminal-white text-glow' : 'text-terminal-green'}>
                {ach.text}
              </span>
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
