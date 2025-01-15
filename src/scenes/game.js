import { Scene } from "phaser";
import { createAnims, preload } from "../unitFactory";
import unitFactory from "../unitFactory";

/**
 * @property {import("../objects/unit").default[]} units All units on the map
 */
export default class GameScene extends Scene {
  create() {
    this.units = [];
    this.#createAnims();

    this.units.push(unitFactory("knights", 1, this, "player"));
    this.units.push(unitFactory("knights", 2, this, "player"));
    this.units.push(unitFactory("knights", 3, this, "player"));
    this.units.push(unitFactory("knights", 1, this, "bot"));
    this.units.push(unitFactory("knights", 2, this, "bot"));
    this.units.push(unitFactory("knights", 3, this, "bot"));
  }

  update() {
    this.units = this.units.filter((unit) => unit.alive);
  }

  preload() {
    preload(this);
  }

  #createAnims() {
    createAnims(this);
  }
}
