import React from 'react';

const LoadingScreen = ({ message = 'Gozy Masterpiece' }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#001F3F]">
      <style>{`
        @keyframes gozy-spin { to { transform: rotate(360deg); } }
        @keyframes gozy-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .6; transform: scale(.94); } }
        @keyframes gozy-sweep { 0% { transform: translateX(-120%); } 100% { transform: translateX(360%); } }
      `}</style>

      <div className="relative h-28 w-28">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          style={{ animation: 'gozy-spin 1.1s linear infinite' }}
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="3"
            strokeLinecap="round" strokeDasharray="72 220" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-4xl text-[#D4AF37]"
            style={{ animation: 'gozy-pulse 1.8s ease-in-out infinite' }}>G</span>
        </div>
      </div>

      <p className="mt-8 font-serif text-lg uppercase tracking-[0.3em] text-white/90">{message}</p>

      <div className="mt-5 h-[2px] w-44 overflow-hidden bg-white/10">
        <div className="h-full w-1/3 bg-[#D4AF37]"
          style={{ animation: 'gozy-sweep 1.4s ease-in-out infinite' }} />
      </div>
    </div>
  );
};

export default LoadingScreen;
