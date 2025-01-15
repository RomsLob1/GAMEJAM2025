import Phaser from "phaser";
import { createAnims, preload } from "../unitFactory";
import unitFactory from "../unitFactory";

/**
 * @property {import("../objects/unit").default[]} units All units on the map
 */
export default class MainGameScene extends Phaser.Scene {
  create() {
    this.units = [];
    createAnims(this);

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
    this.#handleInput();
    this.#setBounds({ x: 0, y: 0, width: 1472, height: 640 });
  }

  update() {
    this.units = this.units.filter((unit) => unit.alive);
  }

  #handleInput() {
    const keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.Q,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    keys.left.on("down", () => this.#handleMove(keys));
    keys.left.on("up", () => this.#handleMove(keys));
    keys.right.on("down", () => this.#handleMove(keys));
    keys.right.on("up", () => this.#handleMove(keys));
  }

  #handleMove(keys) {
    if (keys.left.isDown && keys.right.isDown) {
      this.cameras.main.setScroll(0, 0);
    } else if (keys.right.isDown) {
      this.cameras.main.setScroll(-1000, 0);
    } else if (keys.left.isDown) {
      this.cameras.main.setScroll(0, 1000);
    }
  }

  #setBounds({ x, y, width, height }) {
    this.cameras.main.setBounds(x, y, width, height);
    this.physics.world.setBounds(x, y, width, height);
  }

  preload() {
    preload(this);
  }
}
