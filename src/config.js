import Phaser from "phaser";

/**
 * @type {Phaser.Types.Core.GameConfig}
 */
export default {
  type: Phaser.AUTO,
  width: 800, // TODO: decide on a good size
  height: 750,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.Center,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      debugShowBody: false,
    },
  },
  backgroundColor: "#87CEEB",
  render: {
    pixelArt: true,
  },
};
