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
    };

    this.add.image(1500, 300, "background").setScale(1.2);
    this.imageWidth = 3000;
    this.imageHeight = 250;

    this.bases = [
      new Base(this, 400, 275, "base1").setScale(1.4),
      new Base(this, 2700, 335, "base2").setScale(2),
    ];

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

  update() {
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
    this.load.image("background", "/public/Background.png");
    this.load.image("base1", "/public/boat.png");
    this.load.image("base2", "/public/castle.png");
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
