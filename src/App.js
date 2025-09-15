import React, { useState, useEffect, useRef } from 'react';
import AudioEngine from './audio/audioEngine';
import Timeline from './components/Timeline';
import InstrumentPanel from './components/InstrumentPanel';
import Controls from './components/Controls';
import Tooltip from './components/Tooltip';
import Logo from './components/Logo';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [timeline, setTimeline] = useState(Array(16).fill(null).map(() => Array(4).fill(null)));
  const [currentStep, setCurrentStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const audioEngine = useRef(new AudioEngine());
  const intervalRef = useRef(null);

  useEffect(() => {
    audioEngine.current.initialize();
    audioEngine.current.setTempo(tempo);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      audioEngine.current.stopLoop();
    };
  }, []);

  useEffect(() => {
    audioEngine.current.setTempo(tempo);
  }, [tempo]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioEngine.current.stopLoop();
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      audioEngine.current.startLoop();
      setIsPlaying(true);
      
      // Visual step indicator
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % 16);
      }, 60000 / (tempo * 4)); // 16th note timing
    }
  };

  const handleTimelineClick = (row, col) => {
    if (selectedInstrument) {
      const newTimeline = [...timeline];
      newTimeline[row][col] = newTimeline[row][col] === selectedInstrument ? null : selectedInstrument;
      setTimeline(newTimeline);
      
      // Play the instrument for immediate feedback
      audioEngine.current.playInstrument(selectedInstrument);
    }
  };

  const handleInstrumentSelect = (instrument) => {
    setSelectedInstrument(instrument);
    audioEngine.current.playInstrument(instrument);
  };

  const showSuggestion = (message, x, y) => {
    setTooltipContent(message);
    setTooltipPosition({ x, y });
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  const getSuggestions = () => {
    const hasDrums = timeline.some(row => row.some(cell => cell === 'drums'));
    const hasPiano = timeline.some(row => row.some(cell => cell === 'piano'));
    const hasSynth = timeline.some(row => row.some(cell => cell === 'synth'));
    
    if (!hasDrums) {
      return "Try adding a drum beat for rhythm! Drums provide the foundation of your track.";
    }
    if (!hasPiano && !hasSynth) {
      return "Add some melody! Piano or synth can create beautiful harmonies.";
    }
    if (tempo < 100) {
      return "Consider increasing the tempo for more energy. 120-140 BPM works great for most genres.";
    }
    if (tempo > 160) {
      return "Try slowing down the tempo for a more relaxed feel. 100-120 BPM can be very groovy.";
    }
    return "Great start! Try layering different instruments to create depth in your track.";
  };

  return (
    <div className="min-h-screen bg-music-bg text-music-text">
      <div className="container mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <Logo />
          <p className="text-music-text/70">
            Create your first beat with this beginner-friendly music app
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Instrument Panel */}
          <div className="lg:col-span-1">
            <InstrumentPanel
              selectedInstrument={selectedInstrument}
              onInstrumentSelect={handleInstrumentSelect}
              onSuggestion={showSuggestion}
            />
          </div>

          {/* Main Timeline Area */}
          <div className="lg:col-span-3">
            <Timeline
              timeline={timeline}
              currentStep={currentStep}
              onCellClick={handleTimelineClick}
              selectedInstrument={selectedInstrument}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8">
          <Controls
            isPlaying={isPlaying}
            tempo={tempo}
            onPlayPause={handlePlayPause}
            onTempoChange={setTempo}
            onSuggestion={showSuggestion}
          />
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <Tooltip
            content={tooltipContent}
            position={tooltipPosition}
          />
        )}
      </div>
    </div>
  );
}

export default App;
