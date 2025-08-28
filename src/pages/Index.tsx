import FloatingLogo from '@/components/FloatingLogo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-screensaver overflow-hidden cursor-none">
      <FloatingLogo />
      
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
