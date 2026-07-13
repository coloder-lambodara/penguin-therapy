// Application Entry Point

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create game engine instance
    gameEngine = new GameEngine();

    // Setup settings toggle listeners
    const soundToggle = document.getElementById('sound-toggle');
    const particlesToggle = document.getElementById('particles-toggle');

    if (soundToggle) {
        soundToggle.addEventListener('change', (e) => {
            gameEngine.soundEnabled = e.target.checked;
            gameEngine.saveSettings();
        });
        soundToggle.checked = gameEngine.soundEnabled;
    }

    if (particlesToggle) {
        particlesToggle.addEventListener('change', (e) => {
            gameEngine.particlesEnabled = e.target.checked;
            gameEngine.saveSettings();
        });
        particlesToggle.checked = gameEngine.particlesEnabled;
    }

    console.log('🐧 Penguin Therapy initialized successfully!');
});

// Handle page unload - save progress
window.addEventListener('beforeunload', () => {
    if (gameEngine) {
        gameEngine.saveStats();
        gameEngine.saveSettings();
    }
});