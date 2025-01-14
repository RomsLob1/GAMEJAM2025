import Phaser from "phaser";

/**
 *
 */
export default class Portrait extends Phaser.GameObjects.Container {
  /**
   * @param {Phaser.Scene} scene The scene the object will reside ignores
   * @param {number} x x position of the Portrait
   * @param {number} y y position of the Portrait
   * @param {string} unitKey the key of the unit to display
   * @param {string} name a name to display above the portrait
   */
  constructor(scene, x, y, unitKey, name = "") {
    super(scene, x, y);

    this.frame = new Phaser.GameObjects.Sprite(scene, 0, 0, "portrait");
    this.add(this.frame);
    this.frame.setOrigin(0.5);
    this.frame.setInteractive();
    const effectPortrait = this.frame.preFX.addColorMatrix();
    effectPortrait.grayscale();

    this.unitKey = unitKey;
    this.unit = new Phaser.GameObjects.Sprite(scene, 0, -10, unitKey);
    this.add(this.unit);
    this.unit.setOrigin(0.5);
    this.unit.setScale(3);
    this.#createAnimation();
    this.unit.anims.play("still");
    const effectUnit = this.unit.preFX.addColorMatrix();
    effectUnit.grayscale();

    if (name !== "") {
      const text = new Phaser.GameObjects.Text(
        scene,
        0,
        -this.frame.height / 2 - 10,
        name,
        {
          fontSize: "24px",
          stroke: "#000000",
          strokeThickness: 2,
        },
      ).setOrigin(0.5);
      this.add(text);
    }

    // when the portrait is hovered, play the walk animation
    this.frame.on("pointerover", () => {
      this.unit.anims.play("walk");
      this.setScale(1.1);
      this.unit.setScale(3.3);
      effectPortrait.grayscale(0);
      effectUnit.grayscale(0);
    });

    // when the portrait is no longer hovered, play the still animation
    this.frame.on("pointerout", () => {
      this.unit.anims.play("still");
      this.setScale(1);
      this.unit.setScale(3);
      effectPortrait.grayscale();
      effectUnit.grayscale();
    });
  }

  #createAnimation() {
    this.unit.anims.create({
      key: "still",
      frames: this.scene.anims.generateFrameNumbers(this.unitKey, {
        frames: [0],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.unit.anims.create({
      key: "walk",
      frames: this.scene.anims.generateFrameNumbers(this.unitKey, {
        start: 6,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  static preLoad(scene, unitKey) {
    scene.load.image("portrait", "./frame.webp");
    scene.load.spritesheet(unitKey, `./units/${unitKey}.png`, {
      frameWidth: 32,
      frameHeight: 32,
    });
    scene.load.glsl("grayscale", "./grayscale.frag");
  }
}
