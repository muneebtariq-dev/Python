const fs = require('fs');
const path = require('path');

const baseDir = 'Stickman-Legends';

const files = {
  'package.json': `{
  "name": "stickman-legends",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.12.5",
    "howler": "^2.2.4",
    "phaser": "^3.80.1"
  },
  "devDependencies": {
    "@types/howler": "^2.2.11",
    "typescript": "^5.4.5",
    "vite": "^5.2.11"
  }
}`,
  'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}`,
  'vite.config.ts': `import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
  },
});`,
  'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Stickman Legends</title>
  <style>
    body { margin: 0; background: #000; overflow: hidden; }
    canvas { display: block; margin: auto; }
  </style>
</head>
<body>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>`,
  'src/main.ts': `import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { HeroSelectionScene } from './scenes/HeroSelectionScene';
import { LoadingScene } from './scenes/LoadingScene';
import { LevelScene } from './scenes/LevelScene';
import { TransitionScene } from './scenes/TransitionScene';
import { BossScene } from './scenes/BossScene';
import { GameOverScene } from './scenes/GameOverScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1366,
  height: 768,
  backgroundColor: '#1a1a2e',
  physics: {
    default: 'matter',
    matter: {
      gravity: { x: 0, y: 1.5 },
      debug: false,
    },
  },
  scene: [
    BootScene,
    PreloadScene,
    MainMenuScene,
    HeroSelectionScene,
    LoadingScene,
    LevelScene,
    TransitionScene,
    BossScene,
    GameOverScene,
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

new Phaser.Game(config);`,
  'src/scenes/BootScene.ts': `import Phaser from 'phaser';
import { SaveSystem } from '../systems/SaveSystem';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    SaveSystem.init();
    // Generate a tiny texture for particles
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff);
    graphics.fillCircle(4, 4, 4);
    graphics.generateTexture('particle', 8, 8);
    graphics.destroy();
    this.scene.start('PreloadScene');
  }
}`,
  'src/scenes/PreloadScene.ts': `import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  create() {
    this.scene.start('MainMenuScene');
  }
}`,
  'src/scenes/MainMenuScene.ts': `import Phaser from 'phaser';
import gsap from 'gsap';
import { MusicManager } from '../utils/MusicManager';
import { SaveSystem } from '../systems/SaveSystem';

export class MainMenuScene extends Phaser.Scene {
  private musicManager!: MusicManager;

  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor('#0f0f23');
    this.musicManager = new MusicManager(this, 'menu');

    // Floating particles
    this.add.particles(0, 0, 'particle', {
      x: { min: 0, max: this.cameras.main.width },
      y: -10,
      lifespan: 5000,
      speedY: { min: 20, max: 50 },
      alpha: { start: 0.6, end: 0 },
      scale: { start: 0.5, end: 0 },
      quantity: 1,
      frequency: 300,
      tint: [0x4a4ae6, 0xe64a4a, 0x4ae64a],
    });

    // Title
    const title = this.add.text(this.cameras.main.centerX, 150, 'STICKMAN\\nLEGENDS', {
      fontFamily: 'Impact, sans-serif',
      fontSize: '80px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center',
    }).setOrigin(0.5);
    gsap.from(title, { y: -50, alpha: 0, duration: 1, ease: 'back.out' });

    // Buttons
    const buttons = [
      { text: 'Start Game', action: () => this.scene.start('HeroSelectionScene') },
      { text: 'How to Play', action: () => this.showHowToPlay() },
      { text: 'Settings', action: () => this.showSettings() },
      { text: 'Credits', action: () => this.showCredits() },
      { text: 'Exit Game', action: () => this.scene.start('MainMenuScene') },
    ];

    buttons.forEach((btn, i) => {
      const y = 350 + i * 80;
      const bg = this.add.rectangle(this.cameras.main.centerX, y, 300, 60, 0x222244, 0.8)
        .setStrokeStyle(2, 0x4a4ae6)
        .setInteractive({ useHandCursor: true });
      const txt = this.add.text(this.cameras.main.centerX, y, btn.text, {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#ffffff',
      }).setOrigin(0.5);

      bg.on('pointerover', () => gsap.to(bg, { scaleX: 1.05, scaleY: 1.05, duration: 0.2 }));
      bg.on('pointerout', () => gsap.to(bg, { scaleX: 1, scaleY: 1, duration: 0.2 }));
      bg.on('pointerdown', () => {
        btn.action();
      });

      gsap.from(bg, { alpha: 0, x: -100, duration: 0.6, delay: 0.2 * i, ease: 'power2.out' });
      gsap.from(txt, { alpha: 0, duration: 0.6, delay: 0.2 * i });
    });

    // Load save
    const save = SaveSystem.load();
    if (save.highestLevel > 1) {
      this.add.text(this.cameras.main.centerX, 720, \`Highest Level: \${save.highestLevel}\`, {
        fontSize: '20px', color: '#aaa' }).setOrigin(0.5);
    }
  }

  private showHowToPlay() {
    const overlay = this.add.rectangle(683, 384, 800, 500, 0x000000, 0.9).setInteractive();
    this.add.text(683, 200, 'HOW TO PLAY', { fontSize: '40px', color: '#fff' }).setOrigin(0.5);
    this.add.text(683, 300, 'A/D - Move\\nSpace - Jump (double for double jump)\\nShift - Dash\\nJ - Light Attack\\nK - Heavy Attack\\nL - Special Power (after unlock)\\nESC - Pause', {
      fontSize: '24px', color: '#ccc', align: 'center' }).setOrigin(0.5);
    const closeBtn = this.add.text(683, 550, 'CLOSE', { fontSize: '30px', color: '#ff4a4a' }).setOrigin(0.5).setInteractive();
    closeBtn.on('pointerdown', () => overlay.destroy());
  }

  private showSettings() { /* similar overlay */ }
  private showCredits() { /* credits overlay */ }
}`,
  'src/scenes/HeroSelectionScene.ts': `import Phaser from 'phaser';
import gsap from 'gsap';
import { SaveSystem } from '../systems/SaveSystem';

const COLORS = [0x000000, 0xffffff, 0x0000ff, 0xff0000, 0x00ff00, 0x800080, 0xffa500, 0xffff00, 0xff69b4, 0x00ffff];

export class HeroSelectionScene extends Phaser.Scene {
  private nameInput!: HTMLInputElement;
  private selectedColor: number = 0x000000;

  constructor() {
    super({ key: 'HeroSelectionScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a2e');
    this.add.text(this.cameras.main.centerX, 80, 'CREATE YOUR HERO', {
      fontFamily: 'Impact',
      fontSize: '50px',
      color: '#ffffff',
      stroke: '#000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Name input (DOM element)
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter name (3-15 letters)';
    input.style.cssText = 'position:absolute; top:200px; left:50%; transform:translateX(-50%); font-size:24px; padding:10px; border-radius:8px; border:2px solid #4a4ae6; background:#222; color:#fff; width:300px; text-align:center;';
    document.body.appendChild(input);
    this.nameInput = input;

    // Validation text
    const validation = this.add.text(this.cameras.main.centerX, 260, '', {
      fontSize: '18px', color: '#ff4444' }).setOrigin(0.5);

    input.addEventListener('input', () => {
      const val = input.value.replace(/[^a-zA-Z]/g, '');
      input.value = val;
      if (val.length < 3) validation.setText('Minimum 3 letters');
      else if (val.length > 15) validation.setText('Maximum 15 letters');
      else validation.setText('✔ Valid');
    });

    // Color selection
    this.add.text(this.cameras.main.centerX, 320, 'Choose Color:', {
      fontSize: '28px', color: '#fff' }).setOrigin(0.5);

    const colorGrid = this.add.container(0, 0);
    COLORS.forEach((color, i) => {
      const x = 450 + (i % 5) * 120;
      const y = 380 + Math.floor(i / 5) * 120;
      const rect = this.add.rectangle(x, y, 80, 80, color)
        .setStrokeStyle(3, 0xffffff)
        .setInteractive({ useHandCursor: true });
      rect.on('pointerdown', () => {
        this.selectedColor = color;
        gsap.to(rect, { scaleX: 1.2, scaleY: 1.2, duration: 0.1, yoyo: true, repeat: 1 });
      });
      colorGrid.add(rect);
    });

    // Start button
    const startBtn = this.add.rectangle(this.cameras.main.centerX, 600, 200, 60, 0x22aa44)
      .setInteractive({ useHandCursor: true });
    this.add.text(this.cameras.main.centerX, 600, 'START', { fontSize: '30px', color: '#fff' }).setOrigin(0.5);
    startBtn.on('pointerdown', () => {
      const name = this.nameInput.value.trim();
      if (name.length >= 3 && name.length <= 15) {
        const save = SaveSystem.load();
        save.playerName = name;
        save.heroColor = this.selectedColor;
        SaveSystem.save(save);
        document.body.removeChild(this.nameInput);
        this.scene.start('LoadingScene', { level: 1 });
      }
    });

    // Back button
    const backBtn = this.add.text(100, 700, '← Back', { fontSize: '24px', color: '#aaa' })
      .setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => {
      document.body.removeChild(this.nameInput);
      this.scene.start('MainMenuScene');
    });
  }
}`,
  'src/scenes/LoadingScene.ts': `import Phaser from 'phaser';
import gsap from 'gsap';

export class LoadingScene extends Phaser.Scene {
  private level!: number;

  constructor() {
    super({ key: 'LoadingScene' });
  }

  init(data: { level: number }) {
    this.level = data.level;
  }

  create() {
    this.cameras.main.setBackgroundColor('#000');
    const barBg = this.add.rectangle(this.cameras.main.centerX, 400, 500, 30, 0x333333).setStrokeStyle(2, 0xffffff);
    const bar = this.add.rectangle(this.cameras.main.centerX - 250, 400, 0, 30, 0x4a4ae6).setOrigin(0, 0.5);
    const percentText = this.add.text(this.cameras.main.centerX, 350, '0%', { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    const stickmanGraphics = this.add.graphics();
    let progress = 0;

    const timer = this.time.addEvent({
      delay: 30,
      callback: () => {
        progress += 0.02;
        if (progress >= 1) {
          progress = 1;
          timer.destroy();
          this.cameras.main.fadeOut(500, 0, 0, 0);
          this.cameras.main.once('camerafadeoutcomplete', () => {
            if (this.level === 10) this.scene.start('BossScene', { level: 10 });
            else if (this.level === 6) this.scene.start('TransitionScene', { level: 6 });
            else this.scene.start('LevelScene', { level: this.level });
          });
        }
        bar.width = 500 * progress;
        percentText.setText(\`\${Math.floor(progress * 100)}%\`);
        // Animated stickman
        stickmanGraphics.clear();
        stickmanGraphics.lineStyle(3, 0xffffff);
        const yOffset = Math.sin(progress * 20) * 10;
        const cx = this.cameras.main.centerX;
        stickmanGraphics.strokeCircle(cx, 500 + yOffset, 10); // head
        stickmanGraphics.beginPath();
        stickmanGraphics.moveTo(cx, 510 + yOffset);
        stickmanGraphics.lineTo(cx, 550 + yOffset);
        stickmanGraphics.strokePath();
        stickmanGraphics.beginPath();
        stickmanGraphics.moveTo(cx, 550 + yOffset);
        stickmanGraphics.lineTo(cx - 15, 590);
        stickmanGraphics.strokePath();
        stickmanGraphics.beginPath();
        stickmanGraphics.moveTo(cx, 550 + yOffset);
        stickmanGraphics.lineTo(cx + 15, 590);
        stickmanGraphics.strokePath();
      },
      repeat: -1,
    });
  }
}`,
  'src/scenes/LevelScene.ts': `import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { UIManager } from '../systems/UIManager';
import { CombatSystem } from '../systems/CombatSystem';
import { AbilitySystem } from '../systems/AbilitySystem';
import { LevelData } from '../data/levels';
import { EnemyData } from '../data/enemies';
import { MusicManager } from '../utils/MusicManager';
import { SaveSystem } from '../systems/SaveSystem';

export class LevelScene extends Phaser.Scene {
  private player!: Player;
  private enemies: Enemy[] = [];
  private uiManager!: UIManager;
  private combatSystem!: CombatSystem;
  private abilitySystem!: AbilitySystem;
  private levelData!: any;
  private musicManager!: MusicManager;
  public level!: number;
  private enemiesDefeated: number = 0;

  constructor() {
    super({ key: 'LevelScene' });
  }

  init(data: { level: number }) {
    this.level = data.level;
  }

  create() {
    this.cameras.main.setBackgroundColor(this.level <= 5 ? '#87CEEB' : '#1a1a2e');
    this.matter.world.setBounds(0, 0, 3000, 900);
    this.levelData = LevelData[this.level - 1];
    this.musicManager = new MusicManager(this, this.level <= 5 ? 'forest' : 'castle');

    // Ground
    this.matter.add.rectangle(1500, 800, 3000, 50, { isStatic: true, friction: 0.5 });
    this.add.rectangle(1500, 800, 3000, 50, this.level <= 5 ? 0x228B22 : 0x444444);

    // Background
    this.createBackground();

    // Player
    const save = SaveSystem.load();
    const playerHealth = this.level <= 5 ? 500 + (this.level - 1) * 300 : 2000;
    this.player = new Player(this, 400, 700, save.heroColor, playerHealth);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, 3000, 900);

    // Enemies
    this.spawnEnemies();

    // Systems
    this.combatSystem = new CombatSystem(this);
    this.abilitySystem = new AbilitySystem(this, this.player);
    this.uiManager = new UIManager(this, this.player, this.enemies, this.level);

    // Input
    this.input.keyboard!.on('keydown-ESC', () => this.uiManager.togglePause());

    this.events.on('enemyDefeated', () => {
      this.enemiesDefeated++;
      if (this.enemies.filter(e => e.active).length === 0) {
        this.levelComplete();
      }
    });

    // Unlock abilities based on level
    if (this.level >= 4) this.abilitySystem.unlockAbility('fireSlash');
    if (this.level >= 7) this.abilitySystem.unlockAbility('thunderDash');
    if (this.level >= 10) this.abilitySystem.unlockAbility('shadowRage');
  }

  private createBackground() {
    if (this.level <= 5) {
      for (let i = 0; i < 20; i++) {
        const x = Phaser.Math.Between(100, 2900);
        this.add.rectangle(x, 700, 40, 100, 0x006400).setAlpha(0.5);
      }
    } else {
      this.add.particles(0, 0, 'particle', {
        x: { min: 0, max: 3000 },
        y: -10,
        lifespan: 3000,
        speedY: { min: 100, max: 200 },
        alpha: 0.3,
        scale: { start: 0.2, end: 0 },
        tint: 0x0000ff,
        frequency: 100,
      });
    }
  }

  private spawnEnemies() {
    const enemyCount = this.levelData.enemyCount;
    const baseHealth = this.level <= 5 ? 100 + (this.level-1)*50 : 200 + (this.level-6)*100;
    for (let i = 0; i < enemyCount; i++) {
      const x = Phaser.Math.Between(800, 2500);
      const enemy = new Enemy(this, x, 700, baseHealth, this.level);
      this.enemies.push(enemy);
    }
  }

  private levelComplete() {
    const save = SaveSystem.load();
    if (this.level >= save.highestLevel) {
      save.highestLevel = this.level + 1;
      SaveSystem.save(save);
    }
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      if (this.level === 9) this.scene.start('BossScene', { level: 10 });
      else if (this.level === 5) this.scene.start('TransitionScene', { level: 6 });
      else this.scene.start('LoadingScene', { level: this.level + 1 });
    });
  }

  update(time: number, delta: number) {
    if (this.player.alive) {
      this.player.update(delta);
      this.enemies.forEach(e => e.update(delta, this.player));
      this.combatSystem.update();
      this.abilitySystem.update(delta);
      this.uiManager.update();
    }
  }
}`,
  'src/scenes/TransitionScene.ts': `import Phaser from 'phaser';
import gsap from 'gsap';

export class TransitionScene extends Phaser.Scene {
  private level!: number;

  constructor() {
    super({ key: 'TransitionScene' });
  }

  init(data: { level: number }) {
    this.level = data.level;
  }

  create() {
    this.cameras.main.setBackgroundColor('#000');
    const text = this.add.text(this.cameras.main.centerX, 400, 'The darkness rises...', {
      fontSize: '40px', color: '#fff' }).setOrigin(0.5).setAlpha(0);
    gsap.to(text, { alpha: 1, duration: 1, yoyo: true, repeat: 1, onComplete: () => {
      this.cameras.main.fadeOut(800, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('LoadingScene', { level: this.level });
      });
    }});

    gsap.to(this.cameras.main, { scrollX: 100, duration: 2, ease: 'power2.in' });
  }
}`,
  'src/scenes/BossScene.ts': `import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { Boss } from '../entities/Boss';
import { UIManager } from '../systems/UIManager';
import { CombatSystem } from '../systems/CombatSystem';
import { AbilitySystem } from '../systems/AbilitySystem';
import { MusicManager } from '../utils/MusicManager';
import { SaveSystem } from '../systems/SaveSystem';

export class BossScene extends Phaser.Scene {
  private player!: Player;
  private boss!: Boss;
  private uiManager!: UIManager;
  private combatSystem!: CombatSystem;
  private abilitySystem!: AbilitySystem;
  private musicManager!: MusicManager;
  private bossDefeated = false;

  constructor() {
    super({ key: 'BossScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a2e');
    this.matter.world.setBounds(0, 0, 2000, 900);
    this.musicManager = new MusicManager(this, 'boss');

    this.matter.add.rectangle(1000, 800, 2000, 50, { isStatic: true });
    this.add.rectangle(1000, 800, 2000, 50, 0x444444);

    const save = SaveSystem.load();
    this.player = new Player(this, 400, 700, save.heroColor, 2000);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, 2000, 900);

    this.boss = new Boss(this, 1200, 500);
    this.combatSystem = new CombatSystem(this);
    this.abilitySystem = new AbilitySystem(this, this.player);
    this.abilitySystem.unlockAbility('fireSlash');
    this.abilitySystem.unlockAbility('thunderDash');
    this.abilitySystem.unlockAbility('shadowRage');
    this.uiManager = new UIManager(this, this.player, [this.boss], 10);

    this.input.keyboard!.on('keydown-ESC', () => this.uiManager.togglePause());

    // Boss intro
    this.cameras.main.shake(200, 0.02);
    this.time.delayedCall(1000, () => {
      this.boss.start();
    });

    this.boss.on('defeated', () => {
      if (!this.bossDefeated) {
        this.bossDefeated = true;
        this.cameras.main.fadeOut(1500, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.start('GameOverScene', {
            victory: true,
            playerName: save.playerName,
          });
        });
      }
    });
  }

  update(time: number, delta: number) {
    if (!this.bossDefeated) {
      if (this.player.alive) this.player.update(delta);
      if (this.boss.active) this.boss.update(delta, this.player);
      this.combatSystem.update();
      this.abilitySystem.update(delta);
      this.uiManager.update();
    }
  }
}`,
  'src/scenes/GameOverScene.ts': `import Phaser from 'phaser';
import gsap from 'gsap';
import { SaveSystem } from '../systems/SaveSystem';

export class GameOverScene extends Phaser.Scene {
  private victory!: boolean;
  private playerName!: string;

  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data: { victory: boolean; playerName: string }) {
    this.victory = data.victory;
    this.playerName = data.playerName;
  }

  create() {
    this.cameras.main.setBackgroundColor('#0f0f23');
    const title = this.victory ? 'VICTORY!' : 'DEFEATED';
    const color = this.victory ? '#ffd700' : '#ff4444';

    const titleText = this.add.text(this.cameras.main.centerX, 200, title, {
      fontFamily: 'Impact',
      fontSize: '80px',
      color: color,
      stroke: '#000',
      strokeThickness: 6,
    }).setOrigin(0.5);

    if (this.victory) {
      const save = SaveSystem.load();
      this.add.text(this.cameras.main.centerX, 350, \`Hero: \${this.playerName}\`, {
        fontSize: '30px', color: '#fff' }).setOrigin(0.5);
      this.add.text(this.cameras.main.centerX, 420, 'Congratulations!\\nYou defeated the Shadow Lord.', {
        fontSize: '24px', color: '#ccc', align: 'center' }).setOrigin(0.5);

      const playAgain = this.add.rectangle(this.cameras.main.centerX, 550, 250, 60, 0x22aa44)
        .setInteractive({ useHandCursor: true });
      this.add.text(this.cameras.main.centerX, 550, 'PLAY AGAIN', { fontSize: '28px', color: '#fff' }).setOrigin(0.5);
      playAgain.on('pointerdown', () => this.scene.start('MainMenuScene'));

      const menuBtn = this.add.rectangle(this.cameras.main.centerX, 630, 250, 60, 0x4444aa)
        .setInteractive({ useHandCursor: true });
      this.add.text(this.cameras.main.centerX, 630, 'MAIN MENU', { fontSize: '28px', color: '#fff' }).setOrigin(0.5);
      menuBtn.on('pointerdown', () => this.scene.start('MainMenuScene'));
    } else {
      const retry = this.add.rectangle(this.cameras.main.centerX, 400, 250, 60, 0xaa4444)
        .setInteractive({ useHandCursor: true });
      this.add.text(this.cameras.main.centerX, 400, 'RETRY', { fontSize: '28px', color: '#fff' }).setOrigin(0.5);
      retry.on('pointerdown', () => this.scene.start('LevelScene', { level: SaveSystem.load().highestLevel || 1 }));
    }

    gsap.from(titleText, { y: -50, alpha: 0, duration: 1.5, ease: 'bounce.out' });
  }
}`,
  'src/entities/Player.ts': `import Phaser from 'phaser';
import gsap from 'gsap';

export class Player extends Phaser.GameObjects.Container {
  public body: Phaser.Physics.Matter.Image;
  public health: number;
  public maxHealth: number;
  public facingRight: boolean = true;
  public isAttacking: boolean = false;
  public specialMeter: number = 0;
  public alive: boolean = true;
  public color: number;

  private graphics: Phaser.GameObjects.Graphics;
  private speed: number = 5;
  private jumpForce: number = -12;
  private canDoubleJump: boolean = true;
  private dashCooldown: number = 0;
  private attackCooldown: number = 0;
  private attackComboStep: number = 0;
  private invulnerable: boolean = false;

  private keyA!: Phaser.Input.Keyboard.Key;
  private keyD!: Phaser.Input.Keyboard.Key;
  private keySpace!: Phaser.Input.Keyboard.Key;
  private keyShift!: Phaser.Input.Keyboard.Key;
  private keyJ!: Phaser.Input.Keyboard.Key;
  private keyK!: Phaser.Input.Keyboard.Key;
  private keyL!: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, x: number, y: number, color: number, health: number) {
    super(scene, x, y);
    this.color = color;
    this.maxHealth = health;
    this.health = health;
    scene.add.existing(this);

    // Physics body
    this.body = scene.matter.add.image(x, y, '__WHITE', undefined, {
      shape: { type: 'rectangle', width: 30, height: 70 },
      friction: 0.01,
      restitution: 0,
    }) as Phaser.Physics.Matter.Image;
    this.body.setDisplaySize(0, 0);
    this.body.setFixedRotation();
    this.add(this.body);

    this.graphics = scene.add.graphics();
    this.add(this.graphics);

    const kb = scene.input.keyboard!;
    this.keyA = kb.addKey('A');
    this.keyD = kb.addKey('D');
    this.keySpace = kb.addKey('SPACE');
    this.keyShift = kb.addKey('SHIFT');
    this.keyJ = kb.addKey('J');
    this.keyK = kb.addKey('K');
    this.keyL = kb.addKey('L');

    this.draw();
  }

  private draw() {
    this.graphics.clear();
    this.graphics.lineStyle(3, this.color);
    // Head
    this.graphics.strokeCircle(0, -35, 8);
    // Body
    this.graphics.beginPath();
    this.graphics.moveTo(0, -27);
    this.graphics.lineTo(0, 10);
    this.graphics.strokePath();
    // Arms
    this.graphics.beginPath();
    this.graphics.moveTo(0, -15);
    this.graphics.lineTo(-10, 0);
    this.graphics.strokePath();
    this.graphics.beginPath();
    this.graphics.moveTo(0, -15);
    this.graphics.lineTo(10, 0);
    this.graphics.strokePath();
    // Legs
    this.graphics.beginPath();
    this.graphics.moveTo(0, 10);
    this.graphics.lineTo(-10, 30);
    this.graphics.strokePath();
    this.graphics.beginPath();
    this.graphics.moveTo(0, 10);
    this.graphics.lineTo(10, 30);
    this.graphics.strokePath();
  }

  update(delta: number) {
    if (!this.alive) return;
    const vel = this.body.body.velocity;
    if (this.keyA.isDown && !this.isAttacking) {
      this.body.setVelocityX(-this.speed);
      this.facingRight = false;
      this.setScale(-1, 1);
    } else if (this.keyD.isDown && !this.isAttacking) {
      this.body.setVelocityX(this.speed);
      this.facingRight = true;
      this.setScale(1, 1);
    } else {
      this.body.setVelocityX(0);
    }

    // Jump & double jump
    if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
      if (this.body.body.position.y > 750) {
        this.body.setVelocityY(this.jumpForce);
        this.canDoubleJump = true;
      } else if (this.canDoubleJump) {
        this.body.setVelocityY(this.jumpForce * 0.8);
        this.canDoubleJump = false;
      }
    }

    // Dash
    if (this.keyShift.isDown && this.dashCooldown <= 0) {
      this.body.setVelocityX(this.facingRight ? 15 : -15);
      this.dashCooldown = 1000;
      this.invulnerable = true;
      this.scene.time.delayedCall(200, () => { this.invulnerable = false; });
    }
    this.dashCooldown -= delta;

    // Attacks
    if (Phaser.Input.Keyboard.JustDown(this.keyJ) && this.attackCooldown <= 0 && !this.isAttacking) {
      this.lightAttack();
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyK) && this.attackCooldown <= 0 && !this.isAttacking) {
      this.heavyAttack();
    }
    this.attackCooldown -= delta;

    this.x = this.body.x;
    this.y = this.body.y;
    this.draw();
  }

  private lightAttack() {
    this.isAttacking = true;
    this.attackCooldown = 400;
    this.attackComboStep++;
    if (this.attackComboStep > 3) this.attackComboStep = 1;
    this.scene.time.delayedCall(300, () => { this.isAttacking = false; });
    this.scene.events.emit('playerAttack', this, this.attackComboStep * 10, 'light');
  }

  private heavyAttack() {
    this.isAttacking = true;
    this.attackCooldown = 800;
    this.scene.time.delayedCall(500, () => { this.isAttacking = false; });
    this.scene.events.emit('playerAttack', this, 30, 'heavy');
  }

  public takeDamage(amount: number) {
    if (this.invulnerable || !this.alive) return;
    this.health -= amount;
    this.invulnerable = true;
    this.scene.time.delayedCall(200, () => { this.invulnerable = false; });
    this.scene.cameras.main.shake(100, 0.005);
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
      this.scene.scene.start('GameOverScene', { victory: false, playerName: '' });
    }
  }
}`,
  'src/entities/Enemy.ts': `import Phaser from 'phaser';
import { Player } from './Player';

export class Enemy extends Phaser.GameObjects.Container {
  public body: Phaser.Physics.Matter.Image;
  public health: number;
  public maxHealth: number;
  public active: boolean = true;
  private speed: number;
  private attackCooldown: number = 0;
  private graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, health: number, level: number) {
    super(scene, x, y);
    scene.add.existing(this);
    this.health = health;
    this.maxHealth = health;
    this.speed = 2 + level * 0.5;

    this.body = scene.matter.add.image(x, y, '__WHITE', undefined, {
      shape: { type: 'rectangle', width: 30, height: 70 },
      friction: 0.01,
    }) as Phaser.Physics.Matter.Image;
    this.body.setDisplaySize(0, 0);
    this.body.setFixedRotation();
    this.add(this.body);

    this.graphics = scene.add.graphics();
    this.add(this.graphics);

    this.draw();
  }

  private draw() {
    this.graphics.clear();
    this.graphics.lineStyle(3, 0xff0000);
    this.graphics.strokeCircle(0, -35, 8);
    this.graphics.beginPath();
    this.graphics.moveTo(0, -27);
    this.graphics.lineTo(0, 10);
    this.graphics.strokePath();
    this.graphics.beginPath();
    this.graphics.moveTo(0, 10);
    this.graphics.lineTo(-10, 30);
    this.graphics.strokePath();
    this.graphics.beginPath();
    this.graphics.moveTo(0, 10);
    this.graphics.lineTo(10, 30);
    this.graphics.strokePath();
    this.graphics.beginPath();
    this.graphics.moveTo(0, -15);
    this.graphics.lineTo(-10, 0);
    this.graphics.strokePath();
    this.graphics.beginPath();
    this.graphics.moveTo(0, -15);
    this.graphics.lineTo(10, 0);
    this.graphics.strokePath();
  }

  update(delta: number, player: Player) {
    if (!this.active) return;
    const dist = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    if (dist < 30 && this.attackCooldown <= 0) {
      this.attackCooldown = 800;
      this.scene.events.emit('enemyAttack', this, 15);
    } else if (dist < 300) {
      const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
      this.body.setVelocityX(Math.cos(angle) * this.speed);
    } else {
      this.body.setVelocityX(0);
    }
    this.attackCooldown -= delta;
    this.x = this.body.x;
    this.y = this.body.y;
    this.draw();
  }

  public takeDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
      this.active = false;
      this.body.setVelocity(0, 0);
      this.scene.tweens.add({ targets: this, alpha: 0, duration: 300, onComplete: () => this.destroy() });
      this.scene.events.emit('enemyDefeated', this);
    }
  }
}`,
  'src/entities/Boss.ts': `import Phaser from 'phaser';
import { Player } from './Player';

export class Boss extends Phaser.GameObjects.Container {
  public body: Phaser.Physics.Matter.Image;
  public health: number = 10000;
  public maxHealth: number = 10000;
  public active: boolean = false;
  private graphics: Phaser.GameObjects.Graphics;
  private attackTimer: Phaser.Time.TimerEvent | null = null;
  private eventsEmitter: Phaser.Events.EventEmitter;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    this.eventsEmitter = new Phaser.Events.EventEmitter();

    this.body = scene.matter.add.image(x, y, '__WHITE', undefined, {
      shape: { type: 'rectangle', width: 80, height: 180 },
      friction: 0.01,
    }) as Phaser.Physics.Matter.Image;
    this.body.setDisplaySize(0, 0);
    this.body.setFixedRotation();
    this.add(this.body);

    this.graphics = scene.add.graphics();
    this.add(this.graphics);
    this.setScale(2);
    this.draw();
  }

  private draw() {
    this.graphics.clear();
    this.graphics.lineStyle(5, 0x8b0000);
    this.graphics.strokeCircle(0, -80, 20);
    this.graphics.beginPath();
    this.graphics.moveTo(0, -60);
    this.graphics.lineTo(0, 30);
    this.graphics.strokePath();
    this.graphics.beginPath();
    this.graphics.moveTo(0, 30);
    this.graphics.lineTo(-20, 80);
    this.graphics.strokePath();
    this.graphics.beginPath();
    this.graphics.moveTo(0, 30);
    this.graphics.lineTo(20, 80);
    this.graphics.strokePath();
    this.graphics.beginPath();
    this.graphics.moveTo(0, -40);
    this.graphics.lineTo(-30, 0);
    this.graphics.strokePath();
    this.graphics.beginPath();
    this.graphics.moveTo(0, -40);
    this.graphics.lineTo(30, 0);
    this.graphics.strokePath();
  }

  on(event: string, fn: Function) {
    this.eventsEmitter.on(event, fn);
    return this;
  }

  start() {
    this.active = true;
    this.scheduleNextAttack();
  }

  private scheduleNextAttack() {
    const attacks = ['groundSmash', 'shockwave', 'fireAttack', 'jumpAttack', 'laser', 'summon'];
    const choice = Phaser.Utils.Array.GetRandom(attacks);
    this.attackTimer = this.scene.time.delayedCall(Phaser.Math.Between(2000, 4000), () => {
      if (this.active) {
        (this as any)[choice]();
        this.scheduleNextAttack();
      }
    });
  }

  groundSmash() { this.scene.cameras.main.shake(300, 0.02); }
  shockwave() { /* spawn wave */ }
  fireAttack() { /* fire */ }
  jumpAttack() { }
  laser() { }
  summon() { }

  update(delta: number, player: Player) {
    if (!this.active) return;
    const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
    this.body.setVelocityX(Math.cos(angle) * 1.5);
    this.x = this.body.x;
    this.y = this.body.y;
    this.draw();
  }

  public takeDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
      this.active = false;
      if (this.attackTimer) this.attackTimer.destroy();
      this.eventsEmitter.emit('defeated');
    }
  }
}`,
  'src/entities/Projectile.ts': `import Phaser from 'phaser';

export class Projectile extends Phaser.GameObjects.Graphics {
  private velocity: Phaser.Math.Vector2;
  public damage: number;

  constructor(scene: Phaser.Scene, x: number, y: number, vx: number, vy: number, damage: number) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.velocity = new Phaser.Math.Vector2(vx, vy);
    this.fillStyle(0xffaa00);
    this.fillCircle(0, 0, 8);
    scene.add.existing(this);
  }

  update(delta: number) {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.x < 0 || this.x > 3000 || this.y > 900) this.destroy();
  }
}`,
  'src/systems/CombatSystem.ts': `import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { Boss } from '../entities/Boss';

export class CombatSystem {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.scene.events.on('playerAttack', this.handlePlayerAttack, this);
    this.scene.events.on('enemyAttack', this.handleEnemyAttack, this);
  }

  private handlePlayerAttack(attacker: Player, damage: number, type: string) {
    const bodies = this.scene.matter.intersectBody(attacker.body.body as MatterJS.BodyType, 50);
    if (bodies.length > 0) {
      for (const b of bodies) {
        const go = b.gameObject;
        if (go instanceof Enemy && go.active) go.takeDamage(damage);
        if (go instanceof Boss && go.active) go.takeDamage(damage);
      }
    }
  }

  private handleEnemyAttack(attacker: Enemy | Boss, damage: number) {
    const player = (this.scene as any).player as Player;
    if (player && player.alive) {
      player.takeDamage(damage);
    }
  }

  update() {}
}`,
  'src/systems/AbilitySystem.ts': `import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { Projectile } from '../entities/Projectile';

export class AbilitySystem {
  private scene: Phaser.Scene;
  private player: Player;
  private abilities: { [key: string]: { unlocked: boolean; cooldown: number; lastUsed: number } } = {
    fireSlash: { unlocked: false, cooldown: 5000, lastUsed: 0 },
    thunderDash: { unlocked: false, cooldown: 8000, lastUsed: 0 },
    shadowRage: { unlocked: false, cooldown: 12000, lastUsed: 0 },
  };

  constructor(scene: Phaser.Scene, player: Player) {
    this.scene = scene;
    this.player = player;
    scene.input.keyboard!.on('keydown-L', () => this.useAbility());
  }

  unlockAbility(name: string) {
    if (this.abilities[name]) this.abilities[name].unlocked = true;
  }

  private useAbility() {
    const now = this.scene.time.now;
    if (this.abilities.fireSlash.unlocked && now - this.abilities.fireSlash.lastUsed > this.abilities.fireSlash.cooldown) {
      this.fireSlash();
      this.abilities.fireSlash.lastUsed = now;
    } else if (this.abilities.thunderDash.unlocked && now - this.abilities.thunderDash.lastUsed > this.abilities.thunderDash.cooldown) {
      this.thunderDash();
      this.abilities.thunderDash.lastUsed = now;
    } else if (this.abilities.shadowRage.unlocked && now - this.abilities.shadowRage.lastUsed > this.abilities.shadowRage.cooldown) {
      this.shadowRage();
      this.abilities.shadowRage.lastUsed = now;
    }
  }

  private fireSlash() {
    const dir = this.player.facingRight ? 1 : -1;
    new Projectile(this.scene, this.player.x, this.player.y - 20, dir * 8, 0, 30);
  }

  private thunderDash() {
    this.player.body.setVelocityX(this.player.facingRight ? 20 : -20);
    this.player.invulnerable = true;
    this.scene.time.delayedCall(300, () => { this.player.invulnerable = false; });
  }

  private shadowRage() {
    this.player.speed = 10;
    this.scene.time.delayedCall(4000, () => { this.player.speed = 5; });
  }

  update(delta: number) {}
}`,
  'src/systems/SaveSystem.ts': `export class SaveSystem {
  private static defaultSave = {
    playerName: '',
    heroColor: 0x000000,
    unlockedPowers: [] as string[],
    highestLevel: 1,
    settings: { music: true, sound: true },
  };

  static init() {
    if (!localStorage.getItem('stickman_save')) {
      localStorage.setItem('stickman_save', JSON.stringify(this.defaultSave));
    }
  }

  static load() {
    const data = localStorage.getItem('stickman_save');
    return data ? JSON.parse(data) : { ...this.defaultSave };
  }

  static save(data: any) {
    localStorage.setItem('stickman_save', JSON.stringify(data));
  }
}`,
  'src/systems/UIManager.ts': `import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { Boss } from '../entities/Boss';
import { HealthBar } from '../ui/HealthBar';
import { PauseMenu } from '../ui/PauseMenu';
import { HUD } from '../ui/HUD';

export class UIManager {
  private healthBar: HealthBar;
  private pauseMenu: PauseMenu;
  private hud: HUD;

  constructor(scene: Phaser.Scene, player: Player, enemies: (Enemy | Boss)[], level: number) {
    this.healthBar = new HealthBar(scene, player, enemies);
    this.hud = new HUD(scene, level, player);
    this.pauseMenu = new PauseMenu(scene);
  }

  togglePause() {
    this.pauseMenu.toggle();
  }

  update() {
    this.healthBar.update();
    this.hud.update();
  }
}`,
  'src/ui/HealthBar.ts': `import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { Boss } from '../entities/Boss';

export class HealthBar {
  private scene: Phaser.Scene;
  private playerBar: Phaser.GameObjects.Graphics;
  private player: Player;
  private enemies: (Enemy | Boss)[];
  private enemyBars: Phaser.GameObjects.Graphics[] = [];

  constructor(scene: Phaser.Scene, player: Player, enemies: (Enemy | Boss)[]) {
    this.scene = scene;
    this.player = player;
    this.enemies = enemies;
    this.playerBar = scene.add.graphics().setScrollFactor(0).setDepth(100);
    enemies.forEach((_, i) => {
      const bar = scene.add.graphics().setScrollFactor(0).setDepth(100);
      this.enemyBars.push(bar);
    });
  }

  update() {
    // Player health bar top-left
    this.playerBar.clear();
    this.playerBar.fillStyle(0x000000);
    this.playerBar.fillRect(20, 20, 204, 24);
    this.playerBar.fillStyle(0xff0000);
    const playerW = (this.player.health / this.player.maxHealth) * 200;
    this.playerBar.fillRect(22, 22, playerW, 20);

    // Enemy health bars above each enemy
    this.enemyBars.forEach((bar, i) => {
      bar.clear();
      if (i < this.enemies.length && this.enemies[i].active) {
        const enemy = this.enemies[i];
        const x = enemy.x - 30;
        const y = enemy.y - 60;
        bar.fillStyle(0x000000);
        bar.fillRect(x, y, 60, 8);
        const w = (enemy.health / enemy.maxHealth) * 58;
        bar.fillStyle(0xff0000);
        bar.fillRect(x + 1, y + 1, w, 6);
      }
    });
  }
}`,
  'src/ui/PauseMenu.ts': `import Phaser from 'phaser';

export class PauseMenu {
  private overlay!: Phaser.GameObjects.Container;
  private isPaused: boolean = false;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.create();
  }

  private create() {
    this.overlay = this.scene.add.container(0, 0).setDepth(200).setScrollFactor(0);
    this.overlay.setVisible(false);
    const bg = this.scene.add.rectangle(683, 384, 1366, 768, 0x000000, 0.7).setInteractive();
    const resume = this.scene.add.text(683, 300, 'Resume', { fontSize: '32px', color: '#fff' }).setOrigin(0.5).setInteractive();
    resume.on('pointerdown', () => this.toggle());
    const mainMenu = this.scene.add.text(683, 400, 'Main Menu', { fontSize: '32px', color: '#fff' }).setOrigin(0.5).setInteractive();
    mainMenu.on('pointerdown', () => {
      this.scene.scene.start('MainMenuScene');
    });
    this.overlay.add([bg, resume, mainMenu]);
  }

  toggle() {
    this.isPaused = !this.isPaused;
    this.overlay.setVisible(this.isPaused);
    if (this.isPaused) {
      this.scene.scene.pause();
    } else {
      this.scene.scene.resume();
    }
  }
}`,
  'src/ui/HUD.ts': `import Phaser from 'phaser';
import { Player } from '../entities/Player';

export class HUD {
  private scene: Phaser.Scene;
  private levelText: Phaser.GameObjects.Text;
  private specialMeter: Phaser.GameObjects.Graphics;
  private player: Player;

  constructor(scene: Phaser.Scene, level: number, player: Player) {
    this.scene = scene;
    this.player = player;
    this.levelText = scene.add.text(10, 60, \`Level \${level}\`, { fontSize: '24px', color: '#fff' }).setScrollFactor(0).setDepth(100);
    this.specialMeter = scene.add.graphics().setScrollFactor(0).setDepth(100);
  }

  update() {
    this.specialMeter.clear();
    this.specialMeter.fillStyle(0x000000);
    this.specialMeter.fillRect(20, 90, 104, 14);
    this.specialMeter.fillStyle(0x0000ff);
    const w = (this.player.specialMeter / 100) * 100;
    this.specialMeter.fillRect(22, 92, w, 10);
  }
}`,
  'src/data/levels.ts': `export const LevelData = [
  { enemyCount: 2, background: 'forest' },
  { enemyCount: 3, background: 'forest' },
  { enemyCount: 4, background: 'forest' },
  { enemyCount: 5, background: 'forest' },
  { enemyCount: 6, background: 'forest', largeBattle: true },
  { enemyCount: 5, background: 'castle' },
  { enemyCount: 6, background: 'castle' },
  { enemyCount: 7, background: 'castle' },
  { enemyCount: 8, background: 'castle' },
];`,
  'src/data/enemies.ts': `export interface EnemyConfig {
  health: number;
  speed: number;
  damage: number;
}

export const EnemyData: Record<number, EnemyConfig> = {
  1: { health: 100, speed: 2, damage: 10 },
  2: { health: 150, speed: 2.3, damage: 12 },
  3: { health: 200, speed: 2.5, damage: 15 },
  4: { health: 250, speed: 2.8, damage: 18 },
  5: { health: 300, speed: 3, damage: 20 },
  6: { health: 400, speed: 3.5, damage: 25 },
  7: { health: 500, speed: 4, damage: 30 },
  8: { health: 600, speed: 4.5, damage: 35 },
  9: { health: 800, speed: 5, damage: 40 },
};`,
  'src/data/powers.ts': `export const Powers = {
  fireSlash: { name: 'Fire Slash', cooldown: 5000, damage: 30 },
  thunderDash: { name: 'Thunder Dash', cooldown: 8000, damage: 50 },
  shadowRage: { name: 'Shadow Rage', cooldown: 12000, speedBoost: 1.5, duration: 4000 },
};`,
  'src/utils/MusicManager.ts': `export class MusicManager {
  private audioContext: AudioContext;
  private gainNode: GainNode;
  private oscillator: OscillatorNode | null = null;

  constructor(scene: Phaser.Scene, theme: 'menu' | 'forest' | 'castle' | 'boss' = 'menu') {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 0.15;
    this.gainNode.connect(this.audioContext.destination);
    this.startTheme(theme);
  }

  private startTheme(theme: string) {
    if (this.oscillator) return;
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = 'sawtooth';
    switch (theme) {
      case 'boss': this.oscillator.frequency.value = 110; break;
      case 'castle': this.oscillator.frequency.value = 130; break;
      case 'forest': this.oscillator.frequency.value = 160; break;
      default: this.oscillator.frequency.value = 150;
    }
    this.oscillator.connect(this.gainNode);
    this.oscillator.start();
  }

  stop() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
  }
}`,
};

// Create directories and write files
function createProject() {
  if (fs.existsSync(baseDir)) {
    console.log('Directory Stickman-Legends already exists. Please remove it or rename.');
    return;
  }
  fs.mkdirSync(baseDir, { recursive: true });

  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(baseDir, filePath);
    const dir = path.dirname(fullPath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
  }

  // Create a simple placeholder for the particle texture (already generated in BootScene)
  console.log('Project created successfully!');
  console.log('Run: cd Stickman-Legends && npm install && npm run dev');
}

createProject();