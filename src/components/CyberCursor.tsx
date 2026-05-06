import { useEffect, useRef } from 'react';

export default function CyberCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX - 6}px`;
      cursor.style.top = `${mouseY - 6}px`;
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = `${followerX - 18}px`;
      follower.style.top = `${followerY - 18}px`;
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animate();

    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-3 h-3 rounded-full"
        style={{
          background: '#00ff88',
          boxShadow: '0 0 10px #00ff88, 0 0 20px #00ff88',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={followerRef}
        className="fixed pointer-events-none z-[9998] w-9 h-9 rounded-full"
        style={{
          border: '1px solid rgba(0,255,136,0.4)',
          transition: 'none',
        }}
      />
    </>
  );
}
