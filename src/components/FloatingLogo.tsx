import { useEffect, useState } from 'react';
import floatingLogo from '@/assets/floating-logo.jpg';

export type MovementMode = 'fixed' | 'screensaver' | 'centerFloat';

interface FloatingLogoProps {
  mode: MovementMode;
}

const FloatingLogo = ({ mode }: FloatingLogoProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0.5, y: 0.3 });
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });
  const [logoSize, setLogoSize] = useState({ width: 0, height: 0 });

  const updateLogoSize = () => {
    // Create a temporary image to get natural dimensions
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const maxSize = Math.min(window.innerWidth, window.innerHeight) * 0.5;
      const maxWidth = Math.min(maxSize, 450);
      
      let width = maxWidth;
      let height = maxWidth / aspectRatio;
      
      if (height > maxSize) {
        height = maxSize;
        width = maxSize * aspectRatio;
      }
      
      setLogoSize({ width, height });
    };
    img.src = floatingLogo;
  };

  const getCenterPosition = () => ({
    x: (window.innerWidth - logoSize.width) / 2,
    y: (window.innerHeight - logoSize.height) / 2
  });

  // Logo size calculation
  useEffect(() => {
    updateLogoSize();
    window.addEventListener('resize', updateLogoSize);
    return () => window.removeEventListener('resize', updateLogoSize);
  }, []);

  // Position initialization and resize handling
  useEffect(() => {
    if (logoSize.width === 0 || logoSize.height === 0) return;
    
    const centerPos = getCenterPosition();

    if (mode === 'fixed' || mode === 'centerFloat') {
      setPosition(centerPos);
      if (mode === 'fixed') {
        setCenterOffset({ x: 0, y: 0 });
      }
    } else {
      setPosition({
        x: Math.random() * (window.innerWidth - logoSize.width),
        y: Math.random() * (window.innerHeight - logoSize.height)
      });
    }

    const handleResize = () => {
      if ((mode === 'fixed' || mode === 'centerFloat') && logoSize.width > 0) {
        setPosition(getCenterPosition());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mode, logoSize]);

  // Movement animation
  useEffect(() => {
    if (mode === 'fixed') return;

    const updatePosition = () => {
      if (mode === 'screensaver') {
        setPosition((prev) => {
          const maxX = window.innerWidth - logoSize.width;
          const maxY = window.innerHeight - logoSize.height;
          
          let newX = prev.x + velocity.x;
          let newY = prev.y + velocity.y;
          let newVelX = velocity.x;
          let newVelY = velocity.y;

          // Hit left or right edge
          if (newX <= 0) {
            newVelX = Math.abs(newVelX); // Always positive when hitting left
            newX = 0;
          } else if (newX >= maxX) {
            newVelX = -Math.abs(newVelX); // Always negative when hitting right
            newX = maxX;
          }

          // Hit top or bottom edge
          if (newY <= 0) {
            newVelY = Math.abs(newVelY); // Always positive when hitting top
            newY = 0;
          } else if (newY >= maxY) {
            newVelY = -Math.abs(newVelY); // Always negative when hitting bottom
            newY = maxY;
          }

          setVelocity({ x: newVelX, y: newVelY });
          return { x: newX, y: newY };
        });
      } else if (mode === 'centerFloat') {
        const time = Date.now() * 0.0002;
        setCenterOffset({
          x: Math.sin(time) * 30,
          y: Math.cos(time * 0.7) * 20
        });
      }
    };

    const interval = setInterval(updatePosition, 16);
    return () => clearInterval(interval);
  }, [velocity, mode, logoSize]);

  const transform = mode === 'centerFloat' 
    ? `translate(${position.x + centerOffset.x}px, ${position.y + centerOffset.y}px)`
    : `translate(${position.x}px, ${position.y}px)`;

  const className = mode === 'fixed' 
    ? 'absolute' 
    : 'absolute transition-all duration-75 ease-linear';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className={className}
        style={{
          transform,
          width: `${logoSize.width}px`,
          height: `${logoSize.height}px`,
        }}
      >
        <img
          src={floatingLogo}
          alt="Floating Logo"
          className="w-full h-full rounded-2xl object-cover"
        />
      </div>
    </div>
  );
};

export default FloatingLogo;