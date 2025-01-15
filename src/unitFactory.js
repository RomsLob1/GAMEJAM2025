import Unit from "./objects/unit";

/**
 * This function creates units for the game
 * @param {"knights" | "pirates"} faction The faction, knights or pirates
 * @param {number} tier The tier of the unit, between 1 and 3, 1 being the lowest tier
 * @param {import("phaser").Scene} scene The scene this unit belongs in
 * @param {"player" | "bot"} side player or bot side
 * @returns {Unit} The unit created
 * @throws {Error} If no unit could be created for the given faction and tier
 */
export default function unitFactory(faction, tier, scene, side) {
  if (faction === "knights") {
    if (tier === 1) {
      return new Unit(scene, side, "MiniSwordMan", {
        maxHealth: 20,
        attack: 3,
      });
    }
    if (tier === 2) {
      return new Unit(scene, side, "MiniArcherMan", {
        maxHealth: 10,
        attack: 5,
        speed: 65,
        range: 100,
        type: "ranged",
        projectileKey: "Arrow",
        attackCooldown: 1000,
      });
    }
    if (tier === 3) {
      return new Unit(scene, side, "MiniHorseMan", {
        maxHealth: 50,
        speed: 25,
        attack: 9,
        range: 40,
      });
    }
  }

  throw new Error(`No unit created for faction ${faction} and tier ${tier}`);
}

/**
 * Function preloads all necessary assets for the units created by this factory
 * @param {import("phaser").Scene} scene Current scene.
 * @returns {void}
 */
export function preload(scene) {
  scene.load.spritesheet("MiniSwordMan", `./units/MiniSwordMan.png`, {
    frameWidth: 32,
    frameHeight: 32,
  });
  scene.load.spritesheet("MiniArcherMan", `./units/MiniArcherMan.png`, {
    frameWidth: 32,
    frameHeight: 32,
  });
  scene.load.spritesheet("MiniHorseMan", `./units/MiniHorseMan.png`, {
    frameWidth: 32,
    frameHeight: 32,
  });
  scene.load.spritesheet("Arrow", `./HumansProjectiles.png`, {
    frameWidth: 16,
    frameHeight: 16,
  });
}

/**
 * Function creates all necessary animations for the units created by this factory
 * @param {import("phaser").Scene} scene Current scene.
 * @returns {void}
 */
export function createAnims(scene) {
  scene.anims.create({
    key: "walk-MiniSwordMan",
    frames: scene.anims.generateFrameNumbers("MiniSwordMan", {
      start: 6,
      end: 11,
    }),
    frameRate: 8,
    repeat: -1,
  });

  scene.anims.create({
    key: "attack-MiniSwordMan",
    frames: scene.anims.generateFrameNumbers("MiniSwordMan", {
      start: 18,
      end: 23,
    }),
    frameRate: 8,
  });

  scene.anims.create({
    key: "die-MiniSwordMan",
    frames: scene.anims.generateFrameNumbers("MiniSwordMan", {
      start: 30,
      end: 33,
    }),
    frameRate: 8,
  });

  scene.anims.create({
    key: "idle-MiniSwordMan",
    frames: scene.anims.generateFrameNumbers("MiniSwordMan", {
      start: 0,
      end: 3,
    }),
    frameRate: 8,
    repeat: -1,
  });

  scene.anims.create({
    key: "walk-MiniArcherMan",
    frames: scene.anims.generateFrameNumbers("MiniArcherMan", {
      start: 11,
      end: 16,
    }),
    frameRate: 8,
    repeat: -1,
  });

  scene.anims.create({
    key: "attack-MiniArcherMan",
    frames: scene.anims.generateFrameNumbers("MiniArcherMan", {
      start: 33,
      end: 43,
    }),
    frameRate: 12,
  });

  scene.anims.create({
    key: "die-MiniArcherMan",
    frames: scene.anims.generateFrameNumbers("MiniArcherMan", {
      start: 66,
      end: 69,
    }),
    frameRate: 8,
  });

  scene.anims.create({
    key: "idle-MiniArcherMan",
    frames: scene.anims.generateFrameNumbers("MiniArcherMan", {
      start: 0,
      end: 3,
    }),
    frameRate: 8,
    repeat: -1,
  });

  scene.anims.create({
    key: "walk-MiniHorseMan",
    frames: scene.anims.generateFrameNumbers("MiniHorseMan", {
      start: 8,
      end: 13,
    }),
    frameRate: 8,
    repeat: -1,
  });

  scene.anims.create({
    key: "attack-MiniHorseMan",
    frames: scene.anims.generateFrameNumbers("MiniHorseMan", {
      start: 16,
      end: 21,
    }),
    frameRate: 12,
  });

  scene.anims.create({
    key: "die-MiniHorseMan",
    frames: scene.anims.generateFrameNumbers("MiniHorseMan", {
      start: 48,
      end: 53,
    }),
    frameRate: 8,
  });

  scene.anims.create({
    key: "idle-MiniHorseMan",
    frames: scene.anims.generateFrameNumbers("MiniHorseMan", {
      start: 0,
      end: 8,
    }),
    frameRate: 8,
    repeat: -1,
  });
}
