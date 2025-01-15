import "./style.css";
import Phaser from "phaser";
import config from "./config.js";
import MenuScene from "./scenes/menu.js";
import GameScene from "./scenes/game.js";

const game = new Phaser.Game(config);
game.scene.add("menu", new MenuScene(), false);
game.scene.add("game", new GameScene(), true);
