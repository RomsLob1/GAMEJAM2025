import Phaser from "phaser";

/**
 * @property {import("../objects/Unit.js").default[]} units All units on the map
 */
export default class SpawnUI extends Phaser.Scene {
  create(data) {
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

    const units =
      this.faction === "knights"
        ? ["MiniSwordMan", "MiniArcherMan", "MiniHorseMan"]
        : ["MiniPirateCrew", "MiniPirateGunner", "MiniCannon"];

    units.forEach((unit, index) => {
      const y = this.sys.canvas.height - 110;
      const x = 10 + index * 110;
      const unitButton = this.add
        .rectangle(x, y, 100, 100, 0x888888)
        .setOrigin(0, 0)
        .setInteractive({ useHandCursor: true });
      this.layers.back.add(unitButton);

      const imgUnit = this.add.image(x + 50, y + 50, unit).setScale(3);
      this.layers.front.add(imgUnit);

      unitButton.on("pointerover", () => {
        unitButton.fillColor = 0xaaaaaa;
      });
      unitButton.on("pointerout", () => {
        unitButton.fillColor = 0x888888;
      });
      unitButton.on("pointerdown", () => {
        this.events.emit("spawnUnit", unit);
      });
    });
  }
}
