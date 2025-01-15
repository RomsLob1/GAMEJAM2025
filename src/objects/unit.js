import Phaser from "phaser";

/**
 *
 */
export default class Unit extends Phaser.GameObjects.Sprite {
  /**
   *
   * @param {import("../scenes/game").default} scene The scene this unit belongs in
   * @param {"player" | "bot"} side player or bot side
   * @param {string} key key of the texture
   * @param { {range?: number, attackCooldown?: number, speed?: number, health?: number, attack?: number} } AIOptions The options of the unit's AI
   */
  constructor(scene, side, key, AIOptions) {
    const x = side === "player" ? 0 : 300;
    super(scene, x + 10, scene.sys.canvas.height / 2, key);
    this.setScale(4);
    this.scene = scene;
    scene.add.existing(this);
    this.side = side;
    this.AIOptions = {
      range: 20,
      attackCooldown: 500,
      speed: 1,
      health: 10,
      attack: 10,
      ...AIOptions,
    };
    this.xVelocity = (side === "player" ? 1 : -1) * this.AIOptions.speed;
  }

  preUpdate() {
    const enemyUnitsInRange = this.scene.units.filter(
      (unit) =>
        unit.side !== this.side &&
        Math.abs(unit.x - this.x) < this.AIOptions.range,
    );
    if (enemyUnitsInRange.length > 0) console.log(enemyUnitsInRange);

    if (enemyUnitsInRange.length > 0) {
      const closestEnemy = enemyUnitsInRange.reduce((acc, unit) => {
        if (acc === null || this.distanceWith(acc) > this.distanceWith(unit)) {
          return unit;
        }
        return acc;
      }, null);
      console.log(closestEnemy.AIOptions.health);

      closestEnemy.damage(this.AIOptions.attack);
    } else {
      this.x += this.xVelocity;
    }
  }

  distanceWith(unit) {
    return Math.abs(this.x - unit.x);
  }

  damage(amount) {
    this.AIOptions.health -= amount;
  }

  get alive() {
    return this.AIOptions.health > 0;
  }
}
