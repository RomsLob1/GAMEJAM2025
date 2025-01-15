import { Scene } from "phaser";
import Unit from "../objects/unit";

/**
 * @property {import("../objects/unit").default[]} units All units on the map
 */
export default class GameScene extends Scene {
  create() {
    this.units = [];

    this.units.push(new Unit(this, "player", "MiniSwordMan", {}));
    this.units.push(new Unit(this, "bot", "MiniSwordMan", {}));
  }

  update() {
    this.units.forEach((unit) => {
      if (!unit.alive) {
        this.children.remove(unit);
      }
    });
    this.units = this.units.filter((unit) => unit.alive);
  }

  preload() {
    console.log("preload");
    this.load.spritesheet("MiniSwordMan", `./units/MiniSwordMan.png`, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
}
