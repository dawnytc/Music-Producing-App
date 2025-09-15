import React from 'react';

const InstrumentPanel = ({ selectedInstrument, onInstrumentSelect, onSuggestion }) => {
  const instruments = [
    {
      id: 'drums',
      name: 'Drums',
      emoji: '🥁',
      color: 'bg-red-500 hover:bg-red-600',
      description: 'Rhythm foundation',
      tip: 'Start with drums to establish the beat!'
    },
    {
      id: 'piano',
      name: 'Piano',
      emoji: '🎹',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Melodic harmony',
      tip: 'Piano adds beautiful melodies and chords'
    },
    {
      id: 'synth',
      name: 'Synth',
      emoji: '🎛️',
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Electronic sounds',
      tip: 'Synth creates modern electronic textures'
    }
  ];

  const handleInstrumentClick = (instrument) => {
    onInstrumentSelect(instrument.id);
    onSuggestion(instrument.tip, 0, 0);
  };

  return (
    <div className="bg-music-surface rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Instruments</h2>
      
      <div className="space-y-3">
        {instruments.map((instrument) => (
          <button
            key={instrument.id}
            onClick={() => handleInstrumentClick(instrument)}
            className={`w-full instrument-button ${
              selectedInstrument === instrument.id
                ? `${instrument.color} text-white shadow-lg scale-105`
                : 'bg-music-bg hover:bg-music-primary/20 text-music-text border border-music-surface'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{instrument.emoji}</span>
              <div className="text-left">
                <div className="font-medium">{instrument.name}</div>
                <div className="text-sm opacity-70">{instrument.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-music-bg rounded-lg">
        <h3 className="text-sm font-medium text-music-accent mb-2">💡 Pro Tips</h3>
        <ul className="text-xs space-y-1 text-music-text/70">
          <li>• Start with drums for rhythm</li>
          <li>• Layer piano for melody</li>
          <li>• Add synth for texture</li>
          <li>• Try different tempos</li>
        </ul>
      </div>

      {selectedInstrument && (
        <div className="mt-4 p-3 bg-music-primary/20 rounded-lg border border-music-primary/30">
          <p className="text-sm text-music-primary font-medium">
            ✓ {instruments.find(i => i.id === selectedInstrument)?.name} selected
          </p>
          <p className="text-xs text-music-text/70 mt-1">
            Click on timeline cells to place sounds
          </p>
        </div>
      )}
    </div>
  );
};

export default InstrumentPanel;
