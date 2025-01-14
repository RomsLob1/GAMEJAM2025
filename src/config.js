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
      // TODO: disable debug when not in dev mode
      debug: true,
      debugShowBody: true,
    },
  },
  backgroundColor: "#87CEEB", // TODO: decide on a good color
  render: {
    pixelArt: true,
  },
};
