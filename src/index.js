import "./style.css";
import Phaser from "phaser";
import config from "./config.js";
import MenuScene from "./scenes/menu.js";

const game = new Phaser.Game(config);
game.scene.add("menu", new MenuScene(), true);
