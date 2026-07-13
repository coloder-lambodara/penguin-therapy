// Main Game Engine

class GameEngine {
    constructor() {
        this.stats = { ...GAME_CONFIG.INITIAL_STATS };
        this.isSleeping = false;
        this.currentState = 'idle';
        this.gameLoopInterval = null;
        this.soundEnabled = true;
        this.particlesEnabled = true;
        this.settingsOpen = false;

        // Initialize sub-engines
        this.renderer = new PixelRenderer('pet-canvas');
        this.particles = new ParticleEngine('pet-container');
        this.animation = new AnimationEngine('pet-container');

        this.init();
    }

    /**
     * Initialize the game
     */
    init() {
        this.loadSettings();
        this.loadStats();
        EnvironmentEngine.createSnow();
        this.renderer.drawPenguin(this.currentState, this.stats);
        this.updateUI();
        this.startGameLoop();
    }

    /**
     * Start the main game loop
     */
    startGameLoop() {
        if (this.gameLoopInterval) clearInterval(this.gameLoopInterval);
        
        this.gameLoopInterval = setInterval(() => {
            if (!this.isSleeping) {
                // Decay stats
                for (let key in GAME_CONFIG.DECAY_RATES) {
                    this.stats[key] -= GAME_CONFIG.DECAY_RATES[key];
                }
                
                this.updateUI();
                this.checkCriticalStats();
                this.autoSave();
            }
        }, GAME_CONFIG.GAME_LOOP_INTERVAL);
    }

    /**
     * Check for critical stat conditions
     */
    checkCriticalStats() {
        if (this.stats.hunger < GAME_CONFIG.CRITICAL_THRESHOLDS.warning) {
            this.showMessage(this.getRandomMessage('hungry'));
        } else if (this.stats.clean < GAME_CONFIG.CRITICAL_THRESHOLDS.warning) {
            this.showMessage(this.getRandomMessage('dirty'));
        } else if (this.stats.energy < GAME_CONFIG.CRITICAL_THRESHOLDS.warning) {
            this.showMessage(this.getRandomMessage('tired'));
        } else if (this.stats.happiness < GAME_CONFIG.CRITICAL_THRESHOLDS.warning) {
            this.showMessage(this.getRandomMessage('sad'));
        }
    }

    /**
     * Execute action
     * @param {string} action - Action to perform
     */
    doAction(action) {
        if (this.isSleeping && action !== 'sleep') return;

        const effects = GAME_CONFIG.ACTIONS[action];
        if (!effects) return;

        switch (action) {
            case 'feed':
                this.applyEffects(effects);
                this.showMessage(this.getRandomMessage('feed'));
                if (this.particlesEnabled) this.particles.spawnParticle('🐟');
                this.animation.jump();
                break;

            case 'play':
                if (this.stats.energy < 20 || this.stats.hunger < 20) {
                    this.showMessage(this.getRandomMessage('unable_play'));
                    return;
                }
                this.applyEffects(effects);
                this.showMessage(this.getRandomMessage('play'));
                if (this.particlesEnabled) this.particles.spawnMultiple('❤️', 2);
                this.animation.jump();
                break;

            case 'clean':
                this.applyEffects(effects);
                this.showMessage(this.getRandomMessage('clean'));
                if (this.particlesEnabled) this.particles.spawnMultiple('🫧', 3);
                this.animation.jump();
                break;

            case 'sleep':
                this.startSleep();
                break;
        }

        this.updateUI();
    }

    /**
     * Apply action effects to stats
     * @param {object} effects - Effects to apply
     */
    applyEffects(effects) {
        for (let stat in effects) {
            if (stat in this.stats) {
                this.stats[stat] += effects[stat];
            }
        }
        this.clampStats();
    }

    /**
     * Start sleep mode
     */
    startSleep() {
        if (this.isSleeping) return;
        
        this.isSleeping = true;
        this.showMessage(this.getRandomMessage('sleep_start'));
        
        EnvironmentEngine.setNightMode(true);
        this.animation.stopBounce();
        this.renderer.drawPenguin('sleepy', this.stats);
        
        // Disable action buttons
        this.setButtonsDisabled(['feed', 'play', 'clean'], true);
        
        let sleepTicks = 0;
        const sleepInterval = setInterval(() => {
            if (this.particlesEnabled) this.particles.spawnParticle('💤');
            this.stats.energy = Math.min(100, this.stats.energy + GAME_CONFIG.ACTIONS.sleep.energy);
            this.updateUI();
            
            sleepTicks++;
            if (sleepTicks >= GAME_CONFIG.MAX_SLEEP_TICKS || this.stats.energy >= 100) {
                clearInterval(sleepInterval);
                this.endSleep();
            }
        }, GAME_CONFIG.SLEEP_TICK_DURATION);
    }

    /**
     * End sleep mode
     */
    endSleep() {
        this.isSleeping = false;
        EnvironmentEngine.setNightMode(false);
        this.animation.startBounce();
        this.showMessage(this.getRandomMessage('sleep_end'));
        this.setButtonsDisabled(['feed', 'play', 'clean'], false);
        this.updateUI();
    }

    /**
     * Update UI elements
     */
    updateUI() {
        this.clampStats();
        this.updateStatBars();
        this.updatePenguinState();
    }

    /**
     * Update stat bar display
     */
    updateStatBars() {
        const statIds = {
            hunger: 'fill-hunger',
            happiness: 'fill-happiness',
            energy: 'fill-energy',
            clean: 'fill-clean'
        };

        for (let stat in statIds) {
            const element = document.getElementById(statIds[stat]);
            const value = this.stats[stat];
            
            element.style.width = value + '%';
            element.className = 'stat-fill';
            
            if (value < 25) element.classList.add('danger');
            else if (value < 50) element.classList.add('warning');
        }
    }

    /**
     * Update penguin state based on stats
     */
    updatePenguinState() {
        if (!this.isSleeping) {
            const newState = this.renderer.getMoodState(this.stats);
            if (this.currentState !== newState || this.stats.clean < 40) {
                this.currentState = newState;
                this.renderer.drawPenguin(this.currentState, this.stats);
            }
        }
    }

    /**
     * Show message in status box
     * @param {string} text - Message text
     */
    showMessage(text) {
        const statusBox = document.getElementById('status-box');
        statusBox.innerText = text;
    }

    /**
     * Get random message from category
     * @param {string} category - Message category
     * @returns {string} - Random message
     */
    getRandomMessage(category) {
        const messages = MESSAGES[category] || ['...'];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    /**
     * Clamp stats between 0-100
     */
    clampStats() {
        for (let stat in this.stats) {
            this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat]));
        }
    }

    /**
     * Set button disabled state
     * @param {array} buttons - Button names
     * @param {boolean} disabled - Disabled state
     */
    setButtonsDisabled(buttons, disabled) {
        buttons.forEach(btn => {
            const element = document.getElementById(`btn-${btn}`);
            if (element) element.disabled = disabled;
        });
    }

    /**
     * Toggle settings menu
     */
    toggleSettings() {
        const menu = document.getElementById('settings-menu');
        this.settingsOpen = !this.settingsOpen;
        
        if (this.settingsOpen) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    }

    /**
     * Reset game to initial state
     */
    resetGame() {
        if (confirm('Vuoi davvero ricominciare? Tutti i progressi verranno persi.')) {
            this.stats = { ...GAME_CONFIG.INITIAL_STATS };
            this.isSleeping = false;
            this.currentState = 'idle';
            this.setButtonsDisabled(['feed', 'play', 'clean'], false);
            EnvironmentEngine.setNightMode(false);
            this.animation.startBounce();
            this.showMessage(this.getRandomMessage('greeting'));
            this.updateUI();
            this.saveStats();
            this.toggleSettings();
        }
    }

    /**
     * Save stats to localStorage
     */
    saveStats() {
        try {
            localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify({
                stats: this.stats,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.warn('Failed to save stats:', e);
        }
    }

    /**
     * Load stats from localStorage
     */
    loadStats() {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.STATS);
            if (saved) {
                const data = JSON.parse(saved);
                this.stats = { ...data.stats };
            }
        } catch (e) {
            console.warn('Failed to load stats:', e);
        }
    }

    /**
     * Auto-save stats periodically
     */
    autoSave() {
        try {
            const settings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}');
            if (settings.autoSave !== false) {
                this.saveStats();
            }
        } catch (e) {
            // Silently fail
        }
    }

    /**
     * Save settings to localStorage
     */
    saveSettings() {
        try {
            const settings = {
                soundEnabled: this.soundEnabled,
                particlesEnabled: this.particlesEnabled,
                autoSave: true
            };
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        } catch (e) {
            console.warn('Failed to save settings:', e);
        }
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
            if (saved) {
                const settings = JSON.parse(saved);
                this.soundEnabled = settings.soundEnabled !== false;
                this.particlesEnabled = settings.particlesEnabled !== false;
            }
        } catch (e) {
            console.warn('Failed to load settings:', e);
        }
    }
}

// Global game engine instance
let gameEngine;