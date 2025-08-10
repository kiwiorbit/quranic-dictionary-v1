// Audio functionality for click sounds
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.clickBuffer = null;
    }

    initAudio() {
        // Ensure audio context is resumed from a user gesture for browser compatibility
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        // Create a simple click sound (e.g., a short sine wave burst)
        const duration = 0.05; // seconds
        const sampleRate = this.audioContext.sampleRate;
        const frameCount = sampleRate * duration;
        this.clickBuffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
        const channelData = this.clickBuffer.getChannelData(0);
        const frequency = 400; // Higher pitch for a distinct click
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = Math.sin(2 * Math.PI * frequency * (i / sampleRate)) * (1 - (i / frameCount)); // Fade out
        }
    }

    playClickSound() {
        if (!this.audioContext || !this.clickBuffer) {
            this.initAudio(); // Initialize audio context and buffer on first play attempt
        }
        if (this.audioContext && this.clickBuffer) {
            const source = this.audioContext.createBufferSource();
            source.buffer = this.clickBuffer;
            source.connect(this.audioContext.destination);
            source.start(0);
        }
    }
}

// Export for use in other modules
window.AudioManager = AudioManager;
