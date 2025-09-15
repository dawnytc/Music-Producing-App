import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center mb-4">
      {/* Rainbow 3D Cube Logo */}
      <div className="cube-container mr-4">
        <div className="cube">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-music-primary">
        Rhythm Room
      </h1>
    </div>
  );
};

export default Logo;

