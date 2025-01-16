import "./style.css";
import Phaser from "phaser";
import config from "./config.js";
import Menu from "./scenes/Menu.js";
import Game from "./scenes/Game.js";
import SpawnUI from "./scenes/SpawnUI.js";

const game = new Phaser.Game(config);
game.scene.add("menu", new Menu(), true);
game.scene.add("game", new Game());
game.scene.add("spawnUI", new SpawnUI());
