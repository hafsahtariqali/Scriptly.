import React from 'react';

const FogBackground = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated fog background layers */}
      <div className="absolute top-0 left-0 w-full h-full bg-hero-gradient animate-fog opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-hero-gradient animate-fog opacity-30 delay-1000"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-hero-gradient animate-fog opacity-20 delay-2000"></div>
    </div>
  );
};

export default FogBackground;
