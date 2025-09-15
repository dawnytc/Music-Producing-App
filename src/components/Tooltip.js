import React from 'react';

const Tooltip = ({ content, position }) => {
  return (
    <div
      className="fixed z-50 bg-music-accent text-white px-4 py-2 rounded-lg shadow-lg max-w-xs text-sm font-medium animate-bounce-gentle pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 50}px`,
        transform: 'translateX(-50%)'
      }}
    >
      <div className="relative">
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-music-accent"></div>
      </div>
    </div>
  );
};

export default Tooltip;
