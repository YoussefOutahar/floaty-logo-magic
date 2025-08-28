import { useEffect, useState } from 'react';
import floatingLogo from '@/assets/floating-logo.png';

const FloatingLogo = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0.5, y: 0.3 });

  useEffect(() => {
    const updatePosition = () => {
      setPosition((prev) => {
        const logoSize = 120; // Logo size in pixels
        const maxX = window.innerWidth - logoSize;
        const maxY = window.innerHeight - logoSize;
        
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;

        // Bounce off walls
        if (newX <= 0 || newX >= maxX) {
          newVelX = -newVelX;
          newX = Math.max(0, Math.min(newX, maxX));
        }
        if (newY <= 0 || newY >= maxY) {
          newVelY = -newVelY;
          newY = Math.max(0, Math.min(newY, maxY));
        }

        setVelocity({ x: newVelX, y: newVelY });
        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(updatePosition, 16); // ~60fps
    return () => clearInterval(interval);
  }, [velocity]);

  // Initialize position
  useEffect(() => {
    setPosition({
      x: Math.random() * (window.innerWidth - 120),
      y: Math.random() * (window.innerHeight - 120)
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-30 h-30 transition-all duration-75 ease-linear"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div className="relative group">
          {/* Glow effect background */}
          <div className="absolute inset-0 bg-gradient-logo-glow opacity-60 rounded-full blur-xl animate-glow-pulse" />
          
          {/* Main logo */}
          <img
            src={floatingLogo}
            alt="Floating Logo"
            className="relative w-30 h-30 rounded-2xl animate-float shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.4))',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingLogo;