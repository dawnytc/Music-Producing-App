import * as Tone from 'tone';

class AudioEngine {
  constructor() {
    this.isInitialized = false;
    this.isPlaying = false;
    this.tempo = 120;
    this.timeline = [];
    this.instruments = {};
    this.loop = null;
  }

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      await Tone.start();
      this.setupInstruments();
      this.isInitialized = true;
      console.log('Audio engine initialized');
    } catch (error) {
      console.error('Failed to initialize audio engine:', error);
    }
  }

  setupInstruments() {
    // Drum kit
    this.instruments.drums = {
      kick: new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 10,
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.01, decay: 0.3, sustain: 0.01, release: 0.3 }
      }).toDestination(),
      
      snare: new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.01, release: 0.2 }
      }).toDestination(),
      
      hihat: new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.01, release: 0.1 }
      }).toDestination()
    };

    // Piano
    this.instruments.piano = new Tone.Sampler({
      urls: {
        C4: "https://tonejs.github.io/audio/casio/C4.mp3",
        "C#4": "https://tonejs.github.io/audio/casio/C#4.mp3",
        D4: "https://tonejs.github.io/audio/casio/D4.mp3",
        "D#4": "https://tonejs.github.io/audio/casio/D#4.mp3",
        E4: "https://tonejs.github.io/audio/casio/E4.mp3",
        F4: "https://tonejs.github.io/audio/casio/F4.mp3",
        "F#4": "https://tonejs.github.io/audio/casio/F#4.mp3",
        G4: "https://tonejs.github.io/audio/casio/G4.mp3",
        "G#4": "https://tonejs.github.io/audio/casio/G#4.mp3",
        A4: "https://tonejs.github.io/audio/casio/A4.mp3",
        "A#4": "https://tonejs.github.io/audio/casio/A#4.mp3",
        B4: "https://tonejs.github.io/audio/casio/B4.mp3",
        C5: "https://tonejs.github.io/audio/casio/C5.mp3"
      },
      onload: () => console.log('Piano samples loaded'),
      release: 1
    }).toDestination();

    // Synth
    this.instruments.synth = new Tone.Synth({
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 0.8 }
    }).toDestination();
  }

  playInstrument(instrumentType, note = null) {
    if (!this.isInitialized) return;

    switch (instrumentType) {
      case 'drums':
        this.playDrum('kick');
        break;
      case 'piano':
        if (note) this.instruments.piano.triggerAttackRelease(note, '8n');
        break;
      case 'synth':
        if (note) this.instruments.synth.triggerAttackRelease(note, '8n');
        break;
    }
  }

  playDrum(drumType) {
    if (drumType === 'kick') {
      this.instruments.drums.kick.triggerAttackRelease('C1', '8n');
    } else if (drumType === 'snare') {
      this.instruments.drums.snare.triggerAttackRelease('8n');
    } else if (drumType === 'hihat') {
      this.instruments.drums.hihat.triggerAttackRelease('8n');
    }
  }

  setTempo(tempo) {
    this.tempo = tempo;
    Tone.Transport.bpm.value = tempo;
  }

  startLoop() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    Tone.Transport.bpm.value = this.tempo;
    Tone.Transport.start();
  }

  stopLoop() {
    this.isPlaying = false;
    Tone.Transport.stop();
  }

  scheduleNote(instrumentType, note, time, duration = '8n') {
    const instrument = this.instruments[instrumentType];
    if (instrument) {
      Tone.Transport.schedule((time) => {
        if (instrumentType === 'drums') {
          this.playDrum(note);
        } else {
          instrument.triggerAttackRelease(note, duration, time);
        }
      }, time);
    }
  }

  clearSchedule() {
    Tone.Transport.cancel();
  }
}

export default AudioEngine;
