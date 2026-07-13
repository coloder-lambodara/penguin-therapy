// Pixel Art Rendering Engine

class PixelRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.currentState = 'idle';
    }

    /**
     * Draw penguin based on state
     * @param {string} state - Penguin state (idle, happy, sad, sleepy)
     * @param {object} stats - Current game stats
     */
    drawPenguin(state, stats) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const sprite = PENGUIN_SPRITES[state] || PENGUIN_SPRITES.idle;
        
        // Draw sprite
        for (let y = 0; y < sprite.length; y++) {
            for (let x = 0; x < sprite[y].length; x++) {
                const char = sprite[y][x];
                if (PIXEL_PALETTE[char]) {
                    this.ctx.fillStyle = PIXEL_PALETTE[char];
                    this.ctx.fillRect(x, y, 1, 1);
                }
            }
        }

        // Draw dirt overlay if cleanliness is low and not sleeping
        if (stats.clean < 40 && state !== 'sleepy') {
            this.ctx.fillStyle = '#8b5a33'; // dirt color
            this.ctx.globalAlpha = (40 - stats.clean) / 40; // opacity based on dirtiness
            this.ctx.fillRect(4, 6, 2, 1);
            this.ctx.fillRect(7, 7, 2, 1);
            this.ctx.fillRect(5, 8, 1, 1);
            this.ctx.globalAlpha = 1;
        }

        this.currentState = state;
    }

    /**
     * Get penguin state based on stats
     * @param {object} stats - Current game stats
     * @returns {string} - Penguin state
     */
    getMoodState(stats) {
        if (stats.hunger < GAME_CONFIG.MOOD_THRESHOLDS.sad.hunger || 
            stats.happiness < GAME_CONFIG.MOOD_THRESHOLDS.sad.happiness) {
            return 'sad';
        } else if (stats.energy < GAME_CONFIG.MOOD_THRESHOLDS.sleepy) {
            return 'sleepy';
        } else if (stats.happiness > GAME_CONFIG.MOOD_THRESHOLDS.happy.happiness && 
                   stats.hunger > GAME_CONFIG.MOOD_THRESHOLDS.happy.hunger) {
            return 'happy';
        }
        return 'idle';
    }
}

// Particle Effect Engine
class ParticleEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    /**
     * Spawn a particle effect
     * @param {string} emoji - Emoji to display
     */
    spawnParticle(emoji) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerText = emoji;
        particle.style.left = (Math.random() * 40 + 20) + 'px';
        particle.style.bottom = '40px';
        this.container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }

    /**
     * Spawn multiple particles
     * @param {string} emoji - Emoji to display
     * @param {number} count - Number of particles
     */
    spawnMultiple(emoji, count = 3) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => this.spawnParticle(emoji), i * 100);
        }
    }
}

// Animation Engine
class AnimationEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    /**
     * Apply animation to pet
     * @param {string} animClass - Animation class name
     * @param {number} duration - Duration in ms
     */
    animate(animClass, duration = 500) {
        this.container.classList.remove('bounce', 'jump');
        this.container.classList.add(animClass);
        
        setTimeout(() => {
            this.container.classList.remove(animClass);
            if (!gameEngine.isSleeping) {
                this.container.classList.add('bounce');
            }
        }, duration);
    }

    /**
     * Jump animation
     */
    jump() {
        this.animate('jump', 500);
    }

    /**
     * Stop bouncing
     */
    stopBounce() {
        this.container.classList.remove('bounce');
    }

    /**
     * Start bouncing
     */
    startBounce() {
        this.container.classList.add('bounce');
    }
}

// Environment Effects
class EnvironmentEngine {
    /**
     * Create falling snow effect
     */
    static createSnow() {
        const container = document.getElementById('snowflakes');
        container.innerHTML = ''; // Clear existing
        
        for (let i = 0; i < 30; i++) {
            const flake = document.createElement('div');
            flake.className = 'flake';
            flake.style.left = Math.random() * 100 + '%';
            flake.style.animationDuration = (Math.random() * 3 + 2) + 's';
            flake.style.animationDelay = (Math.random() * 5) + 's';
            flake.style.opacity = Math.random();
            container.appendChild(flake);
        }
    }

    /**
     * Toggle night mode
     * @param {boolean} isNight - Is it night time?
     */
    static setNightMode(isNight) {
        const screen = document.getElementById('screen');
        const sunMoon = document.getElementById('sun-moon');
        
        if (isNight) {
            screen.classList.add('night');
            sunMoon.classList.add('moon');
        } else {
            screen.classList.remove('night');
            sunMoon.classList.remove('moon');
        }
    }
}