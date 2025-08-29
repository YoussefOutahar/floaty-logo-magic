import { useState, useEffect } from 'react';
import FloatingLogo from '@/components/FloatingLogo';

export type MovementMode = 'fixed' | 'screensaver' | 'centerFloat';

const Index = () => {
  const [movementMode, setMovementMode] = useState<MovementMode>('centerFloat');

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case '1':
          setMovementMode('fixed');
          break;
        case '2':
          setMovementMode('screensaver');
          break;
        case '3':
          setMovementMode('centerFloat');
          break;
        case 'f':
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-screensaver overflow-hidden cursor-none">
      <FloatingLogo mode={movementMode} />
    </div>
  );
};

export default Index;
