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
        "Légendes, Croisades\n et Pirates",
        {
          fontSize: "64px",
          stroke: "#000000",
          strokeThickness: 4,
          align: "center",
        },
      )
      .setOrigin(0.5);

    this.add
      .text(
        this.sys.canvas.width / 2,
        (this.sys.canvas.height / 10) * 2 + 30,
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

    this.add
      .text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2 + 100,
        "Crédits",
        {
          fontSize: "32px",
          stroke: "#000000",
          strokeThickness: 2,
        },
      )
      .setOrigin(0.5);

    this.add
      .text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2 + 150,
        "Développé par Florian CHASSELOUP, Clément DAVID,\n Romain LOBREAU et Raphaël VÉRY",
        {
          fontSize: "24px",
          stroke: "#000000",
          strokeThickness: 2,
          align: "center",
        },
      )
      .setOrigin(0.5);

    this.add
      .text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2 + 200,
        "Musiques par alkakrab.itch.io",
        {
          fontSize: "24px",
          stroke: "#000000",
          strokeThickness: 2,
          align: "center",
        },
      )
      .setOrigin(0.5);

    this.add
      .text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2 + 250,
        "Sons par tommusic.itch.io",
        {
          fontSize: "24px",
          stroke: "#000000",
          strokeThickness: 2,
          align: "center",
        },
      )
      .setOrigin(0.5);

    this.add
      .text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2 + 300,
        "Sprites par lyaseek.itch.io",
        {
          fontSize: "24px",
          stroke: "#000000",
          strokeThickness: 2,
          align: "center",
        },
      )
      .setOrigin(0.5);
  }

  preload() {
    Portrait.preLoad(this, "MiniSwordMan");
    Portrait.preLoad(this, "MiniPirateCrew");
  }
}
