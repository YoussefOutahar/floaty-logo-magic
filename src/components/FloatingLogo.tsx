import { useEffect, useState } from 'react';
import floatingLogo from '@/assets/floating-logo.png';

export type MovementMode = 'fixed' | 'screensaver' | 'centerFloat';

interface FloatingLogoProps {
  mode: MovementMode;
}

const FloatingLogo = ({ mode }: FloatingLogoProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0.5, y: 0.3 });
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });

  // Initialize position based on mode
  useEffect(() => {
    const logoSize = 120;
    const centerX = (window.innerWidth - logoSize) / 2;
    const centerY = (window.innerHeight - logoSize) / 2;

    if (mode === 'fixed' || mode === 'centerFloat') {
      setPosition({ x: centerX, y: centerY });
    } else {
      setPosition({
        x: Math.random() * (window.innerWidth - logoSize),
        y: Math.random() * (window.innerHeight - logoSize)
      });
    }
  }, [mode]);

  // Handle different movement modes
  useEffect(() => {
    if (mode === 'fixed') return;

    const updatePosition = () => {
      if (mode === 'screensaver') {
        setPosition((prev) => {
          const logoSize = 120;
          const maxX = window.innerWidth - logoSize;
          const maxY = window.innerHeight - logoSize;
          
          let newX = prev.x + velocity.x;
          let newY = prev.y + velocity.y;
          let newVelX = velocity.x;
          let newVelY = velocity.y;

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
      } else if (mode === 'centerFloat') {
        setCenterOffset((prev) => ({
          x: Math.sin(Date.now() * 0.001) * 10,
          y: Math.cos(Date.now() * 0.0008) * 8
        }));
      }
    };

    const interval = setInterval(updatePosition, 16);
    return () => clearInterval(interval);
  }, [velocity, mode]);

  const getTransform = () => {
    if (mode === 'centerFloat') {
      return `translate(${position.x + centerOffset.x}px, ${position.y + centerOffset.y}px)`;
    }
    return `translate(${position.x}px, ${position.y}px)`;
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-30 h-30 transition-all duration-75 ease-linear"
        style={{
          transform: getTransform(),
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