import Phaser from "phaser";
import { createAnims, preload } from "../factory/unitFactory.js";
import unitFactory from "../factory/unitFactory.js";
import Base from "../objects/Base.js";

/**
 * @property {import("../objects/Unit.js").default[]} units All units on the map
 */
export default class Game extends Phaser.Scene {
  create(data) {
    this.faction = data.faction;
    this.units = [];
    this.#createAnims();
    this.targetCameraX = 0;

    this.units.push(unitFactory("knights", 1, this, "player"));
    this.units.push(unitFactory("knights", 2, this, "player"));
    this.units.push(unitFactory("knights", 3, this, "player"));
    this.units.push(unitFactory("pirates", 1, this, "bot"));
    this.units.push(unitFactory("pirates", 2, this, "bot"));
    this.units.push(unitFactory("pirates", 3, this, "bot"));

    this.layers = {
      bg: this.add.layer(),
      back: this.add.layer(),
      front: this.add.layer(),
      endMessage: this.add.layer(),
    };

    const background = this.add.image(1500, 300, "background").setScale(1.2);
    this.imageWidth = 3000;
    this.imageHeight = 250;

    this.bases = [
      new Base(
        this,
        this.faction === "pirate" ? 400 : 2700,
        275,
        "boat",
      ).setScale(1.4),
      new Base(
        this,
        this.faction === "knight" ? 400 : 2700,
        335,
        "castle",
      ).setScale(2),
    ];

    if (this.faction === "knight") {
      background.flipX = true;
      this.bases[0].setFlipX(true);
      this.bases[1].setFlipX(true);
    }

    this.#setBounds({
      x: 0,
      y: 0,
      width: this.imageWidth,
      height: this.imageHeight,
    });
    this.#handleInput();
    this.units.forEach((unit) => {
      unit.layer = this.layers.front;
      unit.setDepth(1);
    });
  }

  get damageables() {
    return [...this.units, ...this.bases];
  }

  update() {
    if (this.bases.some((base) => !base.alive)) {
      let text = "";
      this.game.pause();
      if (!this.bases[0].alive) {
        text =
          this.faction === "knight"
            ? "Tu as réussi a repousser les pirates !"
            : "Les chevaliers vous ont repousser...";
      } else if (!this.bases[1].alive) {
        text =
          this.faction === "pirate"
            ? "Tu as réussi à envahir le chateau !"
            : "Les pirates vous ont envahi...";
      }
      const endText = this.add
        .text(
          this.sys.canvas.width / 2 + this.cameras.main.scrollX,
          this.sys.canvas.height / 2,
          text,
          {
            fontSize: 25,
            color: "white",
            align: "center",
            stroke: "#000000",
            strokeThickness: 4,
          },
        )
        .setOrigin(0.5);
      endText.layer = this.layers.endMessage;
    }

    this.units = this.units.filter((unit) => unit.alive);

    const smoothFactor = 0.1;
    const currentX = this.cameras.main.scrollX;
    this.cameras.main.setScroll(
      // eslint-disable-next-line new-cap -- This is phaser not respecting conventions
      Phaser.Math.Linear(currentX, this.targetCameraX, smoothFactor),
      0,
    );

    if (
      (this.keys.left.isDown || this.keys.leftSecond.isDown) &&
      !(this.keys.right.isDown || this.keys.rightSecond.isDown)
    ) {
      this.targetCameraX -= 10;
    } else if (
      (this.keys.right.isDown || this.keys.rightSecond.isDown) &&
      !(this.keys.left.isDown || this.keys.leftSecond.isDown)
    ) {
      this.targetCameraX += 10;
    }

    const cameraBounds = this.cameras.main.getBounds();

    // eslint-disable-next-line new-cap -- This is phaser not respecting conventions
    this.targetCameraX = Phaser.Math.Clamp(
      this.targetCameraX,
      cameraBounds.left,
      cameraBounds.right,
    );
  }

  preload() {
    preload(this);
    this.load.image("background", "/background.png");
    this.load.image("boat", "/boat.png");
    this.load.image("castle", "/castle.png");
  }

  #createAnims() {
    createAnims(this);
  }

  #handleInput() {
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.Q,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      leftSecond: Phaser.Input.Keyboard.KeyCodes.LEFT,
      rightSecond: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });
  }

  #setBounds({ x, y, width, height }) {
    this.cameras.main.setBounds(x, y, width, height);
    this.physics.world.setBounds(x, y, width, height);
  }
}
