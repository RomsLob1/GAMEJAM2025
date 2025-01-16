import Phaser from "phaser";

const HEALTH_BAR_LENGTH = 250;

/**
 *
 */
export default class Base extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;

    this.scene.add.existing(this);

    this.scene.physics.add.existing(this, true);
    this.faction = texture === "castle" ? "knight" : "pirate";
    this.health = 100;
    this.maxHealth = 100;

    this.healthBar = scene.add.graphics({
      x: this.x - (texture === "castle" ? 300 : 100),
      y: this.y - 160,
    });
    this.healthBar.fillStyle(0x00ff00, 0.5);
    this.healthBar.fillRect(0, 0, HEALTH_BAR_LENGTH, 10);
    this.healthBar.lineStyle(1, 0x000000);
    this.healthBar.strokeRect(0, 0, HEALTH_BAR_LENGTH, 10);
  }

  get side() {
    return this.scene.faction === this.faction ? "player" : "bot";
  }

  get alive() {
    return this.health > 0;
  }

  damage(amount) {
    this.health -= amount;
    this.healthBar.clear();

    const healthPercentage = this.health / this.maxHealth;

    let color = 0xff0000;
    if (healthPercentage > 0.5) {
      color = 0xffa500;
    }
    if (healthPercentage > 0.9) {
      color = 0x00ff00;
    }

    this.healthBar.fillStyle(color);
    this.healthBar.fillRect(
      0,
      0,
      (HEALTH_BAR_LENGTH / this.maxHealth) * Math.max(0, this.health),
      10,
    );

    this.healthBar.lineStyle(1, 0x000000);
    this.healthBar.strokeRect(0, 0, HEALTH_BAR_LENGTH, 10);
  }

  distanceWith(unit) {
    return Math.abs(this.x - unit.x);
  }
}
