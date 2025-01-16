import Phaser from "phaser";

/**
 * @property {import("../objects/Unit.js").default[]} units All units on the map
 */
export default class SpawnUI extends Phaser.Scene {
  static instance;
  create(data) {
    SpawnUI.instance = this;
    this.faction = data.faction;
    this.layers = {
      bg: this.add.layer(),
      back: this.add.layer(),
      front: this.add.layer(),
    };
    this.layers.bg.setDepth(0);
    this.layers.back.setDepth(1);
    this.layers.front.setDepth(2);

    const background = this.add
      .rectangle(
        0,
        this.sys.canvas.height - 150,
        this.sys.canvas.width,
        150,
        0x444444,
      )
      .setOrigin(0, 0);
    this.layers.bg.add(background);

    this.add.text(15, this.sys.canvas.height - 140, "Unités", {
      fontSize: 20,
    });

    this._credits = 0;
    this.energyDisplay = this.add.text(
      200,
      this.sys.canvas.height - 140,
      `Crédits ${this.credits}`,
      {
        fontSize: 20,
      },
    );

    // every amount of time add energy
    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {
        this.credits += 1;
      },
    });

    const units =
      this.faction === "knights"
        ? ["MiniSwordMan", "MiniArcherMan", "MiniHorseMan"]
        : ["MiniPirateCrew", "MiniPirateGunner", "MiniCannon"];
    const costs = [2, 5, 10];

    this.emitter = new Phaser.Events.EventEmitter();

    units.forEach((unit, index) => {
      const y = this.sys.canvas.height - 110;
      const x = 10 + index * 110;
      const cost = costs[index];
      const unitButton = this.add
        .rectangle(x, y, 100, 100, 0x888888)
        .setOrigin(0, 0)
        .setInteractive({ useHandCursor: true });
      this.layers.back.add(unitButton);

      const imgUnit = this.add.image(x + 50, y + 50, unit).setScale(3);
      this.layers.front.add(imgUnit);
      const effects = imgUnit.preFX.addColorMatrix();
      effects.grayscale();
      this.emitter.on("creditsChanged", () => {
        effects.grayscale(this.credits < cost ? 1 : 0);
      });

      const costDisplay = this.add.text(x + 50, y + 15, `Coût ${cost}`, {
        fontSize: 20,
      });
      costDisplay.setOrigin(0.5);
      this.layers.front.add(costDisplay);

      unitButton.on("pointerover", () => {
        unitButton.fillColor = 0xaaaaaa;
      });
      unitButton.on("pointerout", () => {
        unitButton.fillColor = 0x888888;
      });
      unitButton.on("pointerdown", () => {
        if (this.credits >= costs[index]) {
          this.credits -= cost;
          this.events.emit("spawnUnit", index + 1);
        }
      });
    });
  }

  set credits(value) {
    this._credits = value;
    this.emitter.emit("creditsChanged");
    this.energyDisplay.setText(`Credits ${this.credits}`);
  }

  get credits() {
    return this._credits;
  }
}
