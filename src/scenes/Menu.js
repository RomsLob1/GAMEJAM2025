import { Scene } from "phaser";
import Portrait from "../objects/Portrait.js";

/**
 *
 */
export default class Menu extends Scene {
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

    const knightBtn = this.add.existing(
      new Portrait(
        this,
        (this.sys.canvas.width / 10) * 4,
        this.sys.canvas.height / 2,
        "MiniSwordMan",
        "Chevaliers",
      ),
    );

    const piratesBtn = this.add.existing(
      new Portrait(
        this,
        (this.sys.canvas.width / 10) * 6,
        this.sys.canvas.height / 2,
        "MiniPirateCrew",
        "Pirates",
      ),
    );

    knightBtn.frame.on("pointerdown", () => {
      this.scene.start("game", { faction: "knights" });
    });

    piratesBtn.frame.on("pointerdown", () => {
      this.scene.start("game", { faction: "pirates" });
    });
  }

  preload() {
    Portrait.preLoad(this, "MiniSwordMan");
    Portrait.preLoad(this, "MiniPirateCrew");
  }
}
