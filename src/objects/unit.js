import Phaser from "phaser";
import Projectile from "./projectile";

/**
 *
 */
export default class Unit extends Phaser.GameObjects.Container {
  /**
   *
   * @param {import("../scenes/game").default} scene The scene this unit belongs in
   * @param {"player" | "bot"} side player or bot side
   * @param {string} key key of the texture
   * @param { {range?: number, attackCooldown?: number, speed?: number, maxHealth?: number, attack?: number, type?: "ranged" | "melee", projectileKey: string} } AIOptions The options of the unit's AI
   */
  constructor(scene, side, key, AIOptions) {
    const x = side === "player" ? 0 : 600;
    super(scene, x + 10, scene.sys.canvas.height / 2);
    this.key = key;

    this.mainSprite = new Phaser.GameObjects.Sprite(scene, 0, 0, key);
    this.mainSprite.setOrigin(0.25, 0.3);
    this.add(this.mainSprite);
    this.mainSprite.setScale(3);
    this.scene = scene;
    scene.add.existing(this);
    this.side = side;
    if (side === "bot") this.mainSprite.setFlipX(true);

    this.healthBar = scene.add.graphics();
    this.add(this.healthBar);
    this.healthBar.fillStyle(0x00ff00, 0.5);
    this.healthBar.fillRect(0, 0, this.mainSprite.width, 10);
    this.healthBar.lineStyle(1, 0x000000);
    this.healthBar.strokeRect(0, 0, this.mainSprite.width, 10);

    this.AIOptions = {
      range: 20,
      attackCooldown: 500,
      speed: 40,
      maxHealth: 10,
      attack: 2,
      type: "melee",
      ...AIOptions,
      lastAttack: scene.game.getTime(),
    };

    this.health = this.AIOptions.maxHealth;
    this.scene.physics.add.existing(this);
    this.xVelocity = (side === "player" ? 1 : -1) * this.AIOptions.speed;
    this.body.setVelocityX(this.xVelocity);
    this.playAnimation("walk");

    if (this.AIOptions.type === "ranged" && !this.AIOptions.projectileKey) {
      console.warn(
        `No projectile key given for ranged unit ${key}, defaulting to melee`,
      );
      this.AIOptions.type = "melee";
    }
  }

  preUpdate() {
    if (!this.alive) return;

    const enemyUnitsInRange = this.scene.units.filter(
      (unit) =>
        unit.side !== this.side &&
        Math.abs(unit.x - this.x) < this.AIOptions.range,
    );

    if (enemyUnitsInRange.length > 0) {
      if (this.mainSprite.anims.currentAnim.key !== `attack-${this.key}`)
        this.playAnimation("idle", true);

      this.body.setVelocityX(0);
      const closestEnemy = enemyUnitsInRange.reduce((acc, unit) => {
        if (acc === null || this.distanceWith(acc) > this.distanceWith(unit)) {
          return unit;
        }
        return acc;
      }, null);

      if (
        closestEnemy &&
        this.AIOptions.attackCooldown + this.AIOptions.lastAttack <
          this.scene.game.getTime()
      ) {
        if (this.AIOptions.type === "melee") {
          this.playAnimation("attack");
          this.playAnimationAfterRepeat("idle");
          this.AIOptions.lastAttack = this.scene.game.getTime();
          closestEnemy.damage(this.AIOptions.attack);
        } else {
          this.playAnimation("attack");
          this.playAnimationAfterRepeat("idle");
          // eslint-disable-next-line no-new -- I am using new for side effects
          new Projectile(
            this.scene,
            { x: this.x, y: this.y },
            closestEnemy,
            this.AIOptions.projectileKey,
            this.AIOptions.attack,
          );
          this.AIOptions.lastAttack = this.scene.game.getTime();
        }
      }
    } else {
      this.body.setVelocityX(this.xVelocity);
      this.playAnimation("walk", true);
    }
  }

  playAnimation(key, ignore) {
    this.mainSprite.anims.play(`${key}-${this.key}`, ignore);
  }

  playAnimationAfterRepeat(key) {
    this.mainSprite.anims.playAfterRepeat(`${key}-${this.key}`);
  }

  distanceWith(unit) {
    return Math.abs(this.x - unit.x);
  }

  damage(amount) {
    const alivePreviously = this.alive || false;
    this.health -= amount;
    this.healthBar.clear();

    const healthPercentage = this.health / this.AIOptions.maxHealth;

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
      (this.mainSprite.width / this.AIOptions.maxHealth) * this.health,
      10,
    );

    this.healthBar.lineStyle(1, 0x000000);
    this.healthBar.strokeRect(0, 0, this.mainSprite.width, 10);

    if (alivePreviously && !this.alive) {
      this.playAnimation("die");
      this.mainSprite.on("animationcomplete", () => {
        this.scene.children.remove(this);
        this.destroy();
      });
    }
  }

  get alive() {
    return this.health > 0;
  }
}
