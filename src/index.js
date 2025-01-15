import "./style.css";
import Phaser from "phaser";
import config from "./config.js";
import Menu from "./scenes/Menu.js";
import Game from "./scenes/Game.js";

const game = new Phaser.Game(config);
game.scene.add("menu", new Menu());
game.scene.add("game", new Game(), true);
