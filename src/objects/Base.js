import Phaser from "phaser";

/**
 *
 */
export default class Base extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;

    this.scene.add.existing(this);

    this.scene.physics.add.existing(this, true);
  }
}
