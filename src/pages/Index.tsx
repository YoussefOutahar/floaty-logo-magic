import { useState, useEffect } from 'react';
import FloatingLogo from '@/components/FloatingLogo';

export type MovementMode = 'fixed' | 'screensaver' | 'centerFloat';

const Index = () => {
  const [movementMode, setMovementMode] = useState<MovementMode>('centerFloat');

  // Keyboard controls to switch modes
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case '1':
          setMovementMode('fixed');
          break;
        case '2':
          setMovementMode('screensaver');
          break;
        case '3':
          setMovementMode('centerFloat');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-screensaver overflow-hidden cursor-none">
      <FloatingLogo mode={movementMode} />
      
      {/* Mode indicator and controls */}
      <div className="fixed bottom-4 left-4 text-screensaver-text/60 text-sm font-mono">
        <div className="mb-2">Mode: {movementMode}</div>
        <div className="space-y-1 text-xs">
          <div>Press 1: Fixed center</div>
          <div>Press 2: Screensaver</div>
          <div>Press 3: Center float</div>
        </div>
      </div>

      {/* Ambient background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-screensaver-glow/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/2 w-32 h-32 bg-logo-shadow/15 rounded-full blur-xl animate-pulse delay-2000" />
      </div>
    </div>
  );
};

export default Index;
