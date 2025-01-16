import Phaser from "phaser";

/**
 *
 */
export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {import("../scenes/Game.js").default} scene The game scene this projectile belongs to
   * @param { {x: number, y: number} } fromPosition The starting position of the projectile
   * @param {import("./Unit.js").default} target The target of the projectile
   * @param {string} projectileKey The key of the texture for the projectile to use
   * @param {number} attackDamage How much damage the projectile will do upon landing
   * @param {number} yOffset The y offset of the projectile compared to starting position and target
   */
  constructor(
    scene,
    fromPosition,
    target,
    projectileKey,
    attackDamage,
    yOffset,
  ) {
    super(scene, fromPosition.x, fromPosition.y + yOffset, projectileKey);
    this.scene = scene;
    this.scene.physics.add.existing(this);
    const vel = {
      x: target.x - fromPosition.x,
      y: fromPosition.y - fromPosition.y,
    };
    // normalize velocity
    const d = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
    vel.x /= d;
    vel.y /= d;

    this.body.velocity.setTo(vel.x * 90, vel.y * 90);
    this.scene.add.existing(this);
    this.target = target;
    this.attackDamage = attackDamage;
    this.setScale(3);
  }

  preUpdate() {
    // Visually rotate towards the direction of travel
    this.setRotation(Math.atan2(this.body.velocity.y, this.body.velocity.x));

    const enemyUnits = this.scene.physics.collide(
      this,
      this.scene.damageables.filter((unit) => unit.side === this.target.side),
    );

    if (enemyUnits) {
      const closestEnemy = this.scene.damageables
        .filter((enemy) => enemy.side === this.target.side)
        .reduce((acc, cur) => {
          if (acc === null || cur.distanceWith(this) < acc.distanceWith(this))
            return cur;
          return acc;
        });

      closestEnemy.damage(this.attackDamage);
      this.scene.sound.play(`bowhit${Math.floor(Math.random() * 2) + 1}`, {
        volume: 0.5,
      });
      this.destroy();
    }

    if (!this.scene) return;
    // If the projectile is out of bounds, destroy it
    if (this.x < 0 || this.x > this.scene.game.config.width) this.destroy();
    if (this.y < 0 || this.y > this.scene.game.config.height) this.destroy();
  }
}
