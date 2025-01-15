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
    this.units.push(
      new Unit(this, "bot", "MiniArcherMan", {
        type: "ranged",
        projectileKey: "Arrow",
        range: 200,
      }),
    );
    this.units.push(
      new Unit(this, "player", "MiniArcherMan", {
        type: "ranged",
        projectileKey: "Arrow",
        range: 200,
      }),
    );
  }

  update() {
    this.units = this.units.filter((unit) => unit.alive);
  }

  preload() {
    this.load.spritesheet("MiniSwordMan", `./units/MiniSwordMan.png`, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("MiniArcherMan", `./units/MiniArcherMan.png`, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Arrow", `./HumansProjectiles.png`, {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  #createAnims() {
    this.anims.create({
      key: "walk-MiniSwordMan",
      frames: this.anims.generateFrameNumbers("MiniSwordMan", {
        start: 6,
        end: 11,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "attack-MiniSwordMan",
      frames: this.anims.generateFrameNumbers("MiniSwordMan", {
        start: 18,
        end: 23,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "die-MiniSwordMan",
      frames: this.anims.generateFrameNumbers("MiniSwordMan", {
        start: 30,
        end: 33,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "idle-MiniSwordMan",
      frames: this.anims.generateFrameNumbers("MiniSwordMan", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-MiniArcherMan",
      frames: this.anims.generateFrameNumbers("MiniArcherMan", {
        start: 11,
        end: 16,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "attack-MiniArcherMan",
      frames: this.anims.generateFrameNumbers("MiniArcherMan", {
        start: 33,
        end: 43,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "die-MiniArcherMan",
      frames: this.anims.generateFrameNumbers("MiniArcherMan", {
        start: 66,
        end: 69,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "idle-MiniArcherMan",
      frames: this.anims.generateFrameNumbers("MiniArcherMan", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }
}
