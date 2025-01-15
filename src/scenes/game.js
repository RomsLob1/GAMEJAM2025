import { Scene } from "phaser";
import Unit from "../objects/unit";

/**
 * @property {import("../objects/unit").default[]} units All units on the map
 */
export default class GameScene extends Scene {
  create() {
    this.units = [];
    this.#createAnims();

    this.units.push(new Unit(this, "player", "MiniSwordMan", {}));
    this.units.push(new Unit(this, "bot", "MiniSwordMan", {}));
  }

  update() {
    this.units = this.units.filter((unit) => unit.alive);
  }

  preload() {
    this.load.spritesheet("MiniSwordMan", `./units/MiniSwordMan.png`, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  #createAnims() {
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("MiniSwordMan", {
        start: 6,
        end: 11,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("MiniSwordMan", {
        start: 18,
        end: 23,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "die",
      frames: this.anims.generateFrameNumbers("MiniSwordMan", {
        start: 30,
        end: 33,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("MiniSwordMan", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }
}
