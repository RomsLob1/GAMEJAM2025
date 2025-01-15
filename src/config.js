import Phaser from "phaser";

/**
 * @type {Phaser.Types.Core.GameConfig}
 */
export default {
  type: Phaser.AUTO,
  width: 800, // TODO: decide on a good size
  height: 600,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.Center,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: import.meta.env.MODE === "development",
      debugShowBody: true,
    },
  },
  backgroundColor: "#87CEEB",
  render: {
    pixelArt: true,
  },
};
