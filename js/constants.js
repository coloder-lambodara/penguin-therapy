// Game Constants and Configuration

const GAME_CONFIG = {
    // Initial stats (0-100)
    INITIAL_STATS: {
        hunger: 80,
        happiness: 80,
        energy: 80,
        clean: 80
    },
    
    // Decay rates per game tick (2 seconds)
    DECAY_RATES: {
        hunger: 1.5,
        happiness: 1,
        energy: 0.5,
        clean: 0.5
    },
    
    // Action effects
    ACTIONS: {
        feed: {
            hunger: 30,
            energy: 5,
            clean: -5,
            happiness: 0
        },
        play: {
            happiness: 30,
            energy: -15,
            clean: -15,
            hunger: -10
        },
        clean: {
            clean: 100,
            happiness: 10,
            energy: -5
        },
        sleep: {
            energy: 20  // per sleep tick
        }
    },
    
    // Thresholds for mood changes
    MOOD_THRESHOLDS: {
        sad: {
            hunger: 25,
            happiness: 25
        },
        sleepy: 25,
        happy: {
            happiness: 75,
            hunger: 50
        }
    },
    
    // Critical thresholds
    CRITICAL_THRESHOLDS: {
        low: 50,
        warning: 25
    },
    
    // Game loop tick interval (ms)
    GAME_LOOP_INTERVAL: 2000,
    
    // Sleep duration
    SLEEP_TICK_DURATION: 1000,
    MAX_SLEEP_TICKS: 5
};

// Color Palette for Pixel Art
const PIXEL_PALETTE = {
    'b': '#1e272e',  // black/dark outline
    'w': '#ffffff',  // white
    'o': '#ff9f43',  // orange beak/feet
    'p': '#ff8a80',  // pink blush
    't': '#0abde3',  // blue tear
    ' ': null        // transparent
};

// Penguin Sprites (14x10 pixels)
const PENGUIN_SPRITES = {
    idle: [
        "    bbbbbb    ",
        "  bbbbbbbbbb  ",
        " bbbbbbbbbbbb ",
        " bbbwwwwwwbbb ",
        " bbwbwwwwbwbb ",
        " bbwwwwwwwwbb ",
        " bbbbwooowbbb ",
        "  bbbbwwwbbb  ",
        "   bbbbbbbb   ",
        "     o  o     "
    ],
    happy: [
        "    bbbbbb    ",
        "  bbbbbbbbbb  ",
        " bbbbbbbbbbbb ",
        " bbbwwwwwwbbb ",
        " bbwbbwwbbwbb ",
        " bbpppwwpppbb ",
        " bbbbwooowbbb ",
        "  bbbbwwwbbb  ",
        "   bbbbbbbb   ",
        "     o  o     "
    ],
    sad: [
        "    bbbbbb    ",
        "  bbbbbbbbbb  ",
        " bbbbbbbbbbbb ",
        " bbbwwwwwwbbb ",
        " bbwbwwwwbwbb ",
        " bbwtwwwwtwbb ",
        " bbbbbbbbbbbb ",
        "  bbbbwwwbbb  ",
        "   bbbbbbbb   ",
        "     o  o     "
    ],
    sleepy: [
        "    bbbbbb    ",
        "  bbbbbbbbbb  ",
        " bbbbbbbbbbbb ",
        " bbbwwwwwwbbb ",
        " bbwwwwwwwwbb ",
        " bbwwwwwwwwbb ",
        " bbbbbowbbbbb ",
        "  bbbbwwwbbb  ",
        "   bbbbbbbb   ",
        "     o  o     "
    ]
};

// Messages based on stat conditions
const MESSAGES = {
    greeting: [
        "Ciao! Sono il tuo nuovo animaletto domestico.",
        "Benvenuto! Sono felicissimo di conoscerti!"
    ],
    feed: [
        "Yum! Questo pesce era delizioso!",
        "Grazie! Avevo così tanta fame!",
        "Mmm, perfetto! Mi sento meglio ora."
    ],
    play: [
        "Che divertimento!",
        "Mi piace giocare con te!",
        "Adoro i nostri giochi!"
    ],
    clean: [
        "Sono così pulito e soffice!",
        "Mi sento molto meglio dopo il bagno!",
        "Che sollievo! Grazie!"
    ],
    sleep_start: [
        "Nap time... Zzz...",
        "Ho sonno... Godiamoci il riposo..."
    ],
    sleep_end: [
        "Mi sento riposato e in forma!",
        "Che riposo fantastico!"
    ],
    hungry: [
        "Ho così tanta fame...",
        "Mi serve qualcosa da mangiare!"
    ],
    dirty: [
        "Mi sento appiccicaticcio... mi fai un bagno?",
        "Ho bisogno di una doccia!"
    ],
    tired: [
        "Riesco a malapena a tenere gli occhi aperti...",
        "Sono troppo stanco per giocare..."
    ],
    sad: [
        "Mi sento un po' solo.",
        "Mi manchi... vuoi giocare con me?"
    ],
    unable_play: [
        "Sono troppo stanco o affamato per giocare...",
        "Non ce la faccio a giocare adesso."
    ]
};

// Storage keys for localStorage
const STORAGE_KEYS = {
    STATS: 'penguin_stats',
    SETTINGS: 'penguin_settings',
    LAST_SAVE: 'penguin_last_save'
};

// Default settings
const DEFAULT_SETTINGS = {
    soundEnabled: true,
    particlesEnabled: true,
    autoSave: true
};