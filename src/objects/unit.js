import Phaser from "phaser";

/**
 *
 */
export default class Unit extends Phaser.GameObjects.Container {
  /**
   *
   * @param {import("../scenes/game").default} scene The scene this unit belongs in
   * @param {"player" | "bot"} side player or bot side
   * @param {string} key key of the texture
   * @param { {range?: number, attackCooldown?: number, speed?: number, health?: number, attack?: number} } AIOptions The options of the unit's AI
   */
  constructor(scene, side, key, AIOptions) {
    const x = side === "player" ? 0 : 300;
    super(scene, x + 10, scene.sys.canvas.height / 2);
    this.mainSprite = new Phaser.GameObjects.Sprite(scene, 0, 0, key);
    this.mainSprite.setOrigin(0.25, 0.3);
    this.add(this.mainSprite);
    this.mainSprite.setScale(3);
    this.scene = scene;
    scene.add.existing(this);
    this.side = side;
    if (side === "bot") this.mainSprite.setFlipX(true);

    this.AIOptions = {
      range: 20,
      attackCooldown: 500,
      speed: 40,
      health: 10,
      attack: 2,
      ...AIOptions,
      lastAttack: scene.game.getTime(),
    };
    this.scene.physics.add.existing(this);
    this.xVelocity = (side === "player" ? 1 : -1) * this.AIOptions.speed;
    this.body.setVelocityX(this.xVelocity);
  }

  preUpdate() {
    const enemyUnitsInRange = this.scene.units.filter(
      (unit) =>
        unit.side !== this.side &&
        Math.abs(unit.x - this.x) < this.AIOptions.range,
    );
    if (enemyUnitsInRange.length > 0) console.log(enemyUnitsInRange);

    if (enemyUnitsInRange.length > 0) {
      this.body.setVelocityX(0);
      const closestEnemy = enemyUnitsInRange.reduce((acc, unit) => {
        if (acc === null || this.distanceWith(acc) > this.distanceWith(unit)) {
          return unit;
        }
        return acc;
      }, null);

      if (
        this.AIOptions.attackCooldown + this.AIOptions.lastAttack <
        this.scene.game.getTime()
      ) {
        this.AIOptions.lastAttack = this.scene.game.getTime();
        closestEnemy.damage(this.AIOptions.attack);
      }
    } else {
      this.body.setVelocityX(this.xVelocity);
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
