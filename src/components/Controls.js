import React from 'react';

const Controls = ({ isPlaying, tempo, onPlayPause, onTempoChange, onSuggestion }) => {
  const handleTempoChange = (newTempo) => {
    onTempoChange(newTempo);
    
    // Provide tempo-based suggestions
    if (newTempo < 80) {
      onSuggestion("Very slow tempo! Great for ballads and ambient music.", 0, 0);
    } else if (newTempo > 160) {
      onSuggestion("High energy tempo! Perfect for dance and electronic music.", 0, 0);
    } else if (newTempo >= 120 && newTempo <= 140) {
      onSuggestion("Perfect tempo range! This works well for most genres.", 0, 0);
    }
  };

  const handlePlayPause = () => {
    onPlayPause();
    if (!isPlaying) {
      onSuggestion("Great! Now you can hear your creation come to life!", 0, 0);
    }
  };

  return (
    <div className="bg-music-surface rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Controls</h2>
      
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-music-primary hover:bg-music-secondary text-white'
          }`}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>

        {/* Tempo Control */}
        <div className="flex flex-col items-center space-y-2">
          <label className="text-sm font-medium text-music-text/70">
            Tempo: {tempo} BPM
          </label>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleTempoChange(Math.max(60, tempo - 10))}
              className="px-3 py-2 bg-music-bg hover:bg-music-primary/20 rounded-lg transition-colors"
              title="Slow down"
            >
              ⏪ -10
            </button>
            
            <input
              type="range"
              min="60"
              max="200"
              value={tempo}
              onChange={(e) => handleTempoChange(parseInt(e.target.value))}
              className="w-32 h-2 bg-music-bg rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((tempo - 60) / 140) * 100}%, #374151 ${((tempo - 60) / 140) * 100}%, #374151 100%)`
              }}
            />
            
            <button
              onClick={() => handleTempoChange(Math.min(200, tempo + 10))}
              className="px-3 py-2 bg-music-bg hover:bg-music-primary/20 rounded-lg transition-colors"
              title="Speed up"
            >
              +10 ⏩
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleTempoChange(80)}
              className="px-2 py-1 text-xs bg-music-bg hover:bg-music-primary/20 rounded transition-colors"
            >
              Slow (80)
            </button>
            <button
              onClick={() => handleTempoChange(120)}
              className="px-2 py-1 text-xs bg-music-bg hover:bg-music-primary/20 rounded transition-colors"
            >
              Medium (120)
            </button>
            <button
              onClick={() => handleTempoChange(140)}
              className="px-2 py-1 text-xs bg-music-bg hover:bg-music-primary/20 rounded transition-colors"
            >
              Fast (140)
            </button>
          </div>
        </div>

        {/* Tempo Info */}
        <div className="text-center text-sm text-music-text/60 max-w-xs">
          <p className="font-medium mb-1">Tempo Guide:</p>
          <p className="text-xs">
            {tempo < 100 && "Relaxed & smooth"}
            {tempo >= 100 && tempo < 120 && "Moderate & groovy"}
            {tempo >= 120 && tempo < 140 && "Energetic & popular"}
            {tempo >= 140 && "Fast & intense"}
          </p>
        </div>
      </div>

      {/* Additional Controls */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => onSuggestion("Try different instrument combinations! Each adds a unique layer to your track.", 0, 0)}
          className="px-4 py-2 bg-music-accent/20 hover:bg-music-accent/30 text-music-accent rounded-lg transition-colors text-sm"
        >
          💡 Get Suggestions
        </button>
        
        <button
          onClick={() => {
            window.location.reload();
            onSuggestion("Starting fresh! Try a completely different approach this time.", 0, 0);
          }}
          className="px-4 py-2 bg-music-bg hover:bg-music-primary/20 text-music-text rounded-lg transition-colors text-sm"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

export default Controls;
