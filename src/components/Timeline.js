import React from 'react';

const Timeline = ({ timeline, currentStep, onCellClick, selectedInstrument }) => {
  const instrumentNames = {
    drums: '🥁',
    piano: '🎹',
    synth: '🎛️'
  };

  const instrumentColors = {
    drums: 'bg-red-500',
    piano: 'bg-blue-500',
    synth: 'bg-purple-500'
  };

  return (
    <div className="bg-music-surface rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Timeline</h2>
      
      <div className="timeline-grid bg-music-bg rounded-lg p-4 overflow-x-auto">
        <div className="grid grid-cols-17 gap-1 min-w-max">
          {/* Header row with step numbers */}
          <div className="text-center text-sm font-medium text-music-text/70 mb-2">
            Step
          </div>
          {Array.from({ length: 16 }, (_, i) => (
            <div 
              key={i} 
              className={`text-center text-sm font-medium p-2 rounded ${
                i === currentStep ? 'bg-music-primary text-white' : 'text-music-text/70'
              }`}
            >
              {i + 1}
            </div>
          ))}
          
          {/* Instrument rows */}
          {['drums', 'piano', 'synth'].map((instrument, rowIndex) => (
            <React.Fragment key={instrument}>
              <div className="flex items-center justify-center text-sm font-medium text-music-text/70">
                <span className="mr-2">{instrumentNames[instrument]}</span>
                <span className="capitalize">{instrument}</span>
              </div>
              {timeline[rowIndex].map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`timeline-cell w-12 h-12 flex items-center justify-center text-2xl rounded transition-all duration-200 ${
                    cell 
                      ? `${instrumentColors[cell]} text-white shadow-lg` 
                      : 'hover:bg-music-primary/10'
                  } ${
                    colIndex === currentStep ? 'ring-2 ring-music-accent' : ''
                  }`}
                  onClick={() => onCellClick(rowIndex, colIndex)}
                  title={`${instrument} - Step ${colIndex + 1}`}
                >
                  {cell ? instrumentNames[cell] : '+'}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-music-text/60">
        {selectedInstrument ? (
          <p>Click on any cell to place <span className="font-medium">{selectedInstrument}</span></p>
        ) : (
          <p>Select an instrument from the panel to start creating</p>
        )}
      </div>
    </div>
  );
};

export default Timeline;
