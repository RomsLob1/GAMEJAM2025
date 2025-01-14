import { Scene } from "phaser";
import Portrait from "../objects/portrait";

/**
 *
 */
export default class MenuScene extends Scene {
  create() {
    this.add
      .text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 10,
        "[Name of the game]",
        {
          fontSize: "64px",
          stroke: "#000000",
          strokeThickness: 4,
        },
      )
      .setOrigin(0.5);

    this.add
      .text(
        this.sys.canvas.width / 2,
        (this.sys.canvas.height / 10) * 2,
        "Choisis ta faction",
        {
          fontSize: "64px",
          stroke: "#000000",
          strokeThickness: 4,
        },
      )
      .setOrigin(0.5, 0);

    // eslint-disable-next-line no-new -- temporary solution
    new Portrait(
      this,
      this.sys.canvas.width / 4,
      this.sys.canvas.height / 2,
      "MiniSwordMan",
    );

    // eslint-disable-next-line no-new -- temporary solution
    new Portrait(
      this,
      (this.sys.canvas.width / 4) * 3,
      this.sys.canvas.height / 2,
      "MiniSwordMan",
    );
  }

  preload() {
    Portrait.preLoad(this, "MiniSwordMan");
  }
}
