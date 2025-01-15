import Phaser from "phaser";
import { createAnims, preload } from "../unitFactory";
import unitFactory from "../unitFactory";

/**
 * @property {import("../objects/unit").default[]} units All units on the map
 */
export default class GameScene extends Phaser.Scene {
  create() {
    this.units = [];
    this.#createAnims();
    this.targetCameraX = 0;

    this.units.push(unitFactory("knights", 1, this, "player"));
    this.units.push(unitFactory("knights", 2, this, "player"));
    this.units.push(unitFactory("knights", 3, this, "player"));
    this.units.push(unitFactory("knights", 1, this, "bot"));
    this.units.push(unitFactory("knights", 2, this, "bot"));
    this.units.push(unitFactory("knights", 3, this, "bot"));

    this.layers = {
      bg: this.add.layer(),
      back: this.add.layer(),
      front: this.add.layer(),
    };

    this.targetCameraX = 0;
    this.add.image(1500, 300, "background").setScale(1.2);
    this.imageWidth = 3000;
    this.imageHeight = 250;

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
      Phaser.Math.Linear(currentX, this.targetCameraX, smoothFactor),
      0,
    );

    if (this.keys.left.isDown) {
      this.targetCameraX -= 5;
    }
    if (this.keys.right.isDown) {
      this.targetCameraX += 5;
    }
  }

  preload() {
    preload(this);
    this.load.image("background", "/public/Decor.png");
  }

  #createAnims() {
    createAnims(this);
  }
  #handleInput() {
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.Q,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  #setBounds({ x, y, width, height }) {
    this.cameras.main.setBounds(x, y, width, height);
    this.physics.world.setBounds(x, y, width, height);
  }
}
