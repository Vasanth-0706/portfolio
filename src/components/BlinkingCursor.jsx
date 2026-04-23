export default function BlinkingCursor({ className = '' }) {
  return (
    <span className={`cursor-blink text-terminal-green font-bold ${className}`}>
      ▌
    </span>
  );
}
