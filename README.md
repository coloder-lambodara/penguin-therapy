# 🐧 Penguin Therapy - Virtual Pet Game

![Penguin Therapy](https://img.shields.io/badge/Game-Tamagotchi%20Style-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Active-success)

Un gioco interattivo di animale virtuale (Tamagotchi-style) con un adorabile pinguino che ha bisogno delle tue cure!

## ✨ Caratteristiche

- 🐧 **Pixel Art Penguin** - Adorabile pinguino renderizzato in pixel art
- 📊 **Sistema Statistiche Dinamico** - Fame, Felicità, Energia, Pulizia
- 🎮 **4 Azioni Interattive** - Nutrire, Giocare, Dormire, Pulire
- 🌙 **Ciclo Giorno/Notte** - Il pinguino dorme e cambia di aspetto
- 💾 **Salvataggio Automatico** - Progress salvato in localStorage
- 📱 **Responsive Design** - Funziona su desktop, tablet e mobile
- ✨ **Effetti Visuali** - Particelle, animazioni e transizioni fluide
- ⚙️ **Pannello Impostazioni** - Controlli per suoni e effetti
- 🎨 **Interfaccia Retrò** - Design a tema anni '90

## 🚀 Come Usare

### Online (GitHub Pages)
1. Visita il link del repository
2. Abilita GitHub Pages nelle impostazioni
3. Accedi a `https://coloder-lambodara.github.io/penguin-therapy`

### Localmente
1. Clona il repository
   ```bash
   git clone https://github.com/coloder-lambodara/penguin-therapy.git
   cd penguin-therapy
   ```
2. Apri `index.html` nel browser
   - Doppio click sul file
   - O usa un web server locale:
     ```bash
     python -m http.server 8000
     ```

## 🎮 Come Giocare

### Statistiche del Pinguino
- **🍖 Fame** - Aumenta quando nutri il pinguino, cala nel tempo
- **😊 Felicità** - Aumenta quando giochi con il pinguino
- **⚡ Energia** - Cala quando il pinguino gioca, si ripristina con il sonno
- **✨ Pulizia** - Cala quando gioca o mangia, si ripristina con il bagno

### Azioni
1. **🐟 Nutrire** - Il pinguino mangia un pesce e la fame diminuisce
   - Effetto: -Fame (30), +Energia (5), -Pulizia (5)

2. **🎾 Giocare** - Gioca con il pinguino (richiede energia e cibo)
   - Effetto: +Felicità (30), -Energia (15), -Pulizia (15), -Fame (10)

3. **🌙 Dormire** - Il pinguino dorme e recupera energia
   - Lo schermo diventa più scuro
   - Si riprende da solo quando energia è completa

4. **🛁 Pulire** - Il pinguino prende un bagno
   - Effetto: +Pulizia (100), +Felicità (10), -Energia (5)

### Umore del Pinguino
- **Felice** ❤️ - Quando felicità > 75 e fame > 50
- **Triste** 😭 - Quando fame < 25 o felicità < 25
- **Assonnato** 😴 - Quando energia < 25
- **Normale** 😊 - Lo stato predefinito

## 🛠️ Struttura del Progetto

```
penguin-therapy/
├── index.html                 # Entry point
├── css/
│   ├── styles.css            # Stili principali
│   └── responsive.css        # Media queries
├── js/
│   ├── constants.js          # Configurazioni e sprite
│   ├── pixel-renderer.js     # Engine rendering pixel art
│   ├── game-engine.js        # Logica principale del gioco
│   └── main.js               # Initializzazione
└── README.md                 # Documentazione
```

## 🏗️ Architettura

### Moduli

#### `PixelRenderer`
Responsabile del rendering del pinguino e dei cambiamenti di umore
- `drawPenguin(state, stats)` - Disegna il pinguino in pixel art
- `getMoodState(stats)` - Determina lo stato emotivo basato sulle statistiche

#### `ParticleEngine`
Gestisce gli effetti di particelle visive
- `spawnParticle(emoji)` - Crea una singola particella
- `spawnMultiple(emoji, count)` - Crea più particelle

#### `AnimationEngine`
Controlla le animazioni del pinguino
- `animate(animClass, duration)` - Applica un'animazione
- `jump()` - Animazione di salto
- `startBounce()` / `stopBounce()` - Controlla rimbalzo

#### `GameEngine`
Gestore principale del gioco
- `doAction(action)` - Esegue un'azione
- `startGameLoop()` - Avvia il loop di gioco
- `updateUI()` - Aggiorna l'interfaccia
- Salvataggio automatico in localStorage

#### `EnvironmentEngine`
Effetti ambientali
- `createSnow()` - Genera neve che cade
- `setNightMode(isNight)` - Toggle tra giorno/notte

## 💾 Salvataggio Dati

I progressi vengono salvati automaticamente in `localStorage`:
- **Stats**: Tutte le statistiche del pinguino
- **Settings**: Preferenze utente (suoni, effetti)
- **Timestamp**: Ultimo salvataggio

## ⚙️ Configurazione

Tutti i parametri del gioco sono in `js/constants.js`:

```javascript
GAME_CONFIG {
    INITIAL_STATS: {...},      // Statistiche iniziali
    DECAY_RATES: {...},        // Velocità di decadimento
    ACTIONS: {...},            // Effetti delle azioni
    GAME_LOOP_INTERVAL: 2000   // Tick del gioco (ms)
}
```

## 📱 Responsive Design

- **Desktop** (> 768px) - Visualizzazione ottimale
- **Tablet** (481px - 768px) - Interfaccia adattata
- **Mobile** (320px - 480px) - Layout compatto
- **Landscape** - Layout orizzontale ottimizzato

## 🎨 Palette Colori

- **Principale**: #2c3e50 (Blu scuro)
- **Sfondo Dispositivo**: #e0e6ed (Grigio chiaro)
- **Schermo**: #a1d6e2 (Azzurro)
- **Legno**: #d4a373 (Marrone chiaro)
- **Accenti**: #ff9f43 (Arancione)

## 🐧 Sprite del Pinguino

Il pinguino è renderizzato come arte pixel 14x10 con 4 stati:
1. **Idle** - Stato normale
2. **Happy** - Felice con rossore sulle guance
3. **Sad** - Triste con lacrime
4. **Sleepy** - Assonnato

## 🔧 Tecnologie Utilizzate

- **HTML5** - Struttura
- **CSS3** - Stili e animazioni
- **Vanilla JavaScript** - Logica di gioco
- **Canvas 2D** - Rendering pixel art
- **LocalStorage** - Persistenza dati

## 📋 Browser Compatibilità

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🚀 Prossime Funzionalità (Roadmap)

- [ ] Sistema audio (effetti sonori)
- [ ] Sfondi multipli
- [ ] Skin alternative del pinguino
- [ ] Sistema di achievement
- [ ] Multiplayer online
- [ ] Animali domestici aggiuntivi
- [ ] Minigiochi
- [ ] Negozio di oggetti

## 📄 Licenza

Questo progetto è licenziato sotto la licenza MIT - vedi il file [LICENSE](LICENSE) per i dettagli.

## 👨‍💻 Autore

Creato con ❤️ da [coloder-lambodara](https://github.com/coloder-lambodara)

## 🤝 Contributi

I contributi sono benvenuti! Per favore:
1. Fai un fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit i tuoi cambiamenti (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📞 Supporto

Per domande o problemi, apri un'issue nel repository:
- [Issues](https://github.com/coloder-lambodara/penguin-therapy/issues)

## 🎉 Goditi il Gioco!

Tratta bene il tuo pinguino e abbi divertimento! 🐧✨
