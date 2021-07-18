import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player from "./Player/Player.js";
import Title from "./Title/Title.js";
import Level from "./Level/Level.js";
import PlayButton from "./PlayButton/PlayButton.js";
import Cloud from "./Cloud/Cloud.js";
import Background from "./Background/Background.js";
import BadThings from "./BadThings/BadThings.js";
import Portal from "./Portal/Portal.js";

const stage = new Stage({ costumeNumber: 3 });

const sprites = {
  Player: new Player({
    x: 210.23961226808294,
    y: -179,
    direction: 90,
    costumeNumber: 1,
    size: 50,
    visible: false,
    layerOrder: 8
  }),
  Title: new Title({
    x: 0,
    y: 100,
    direction: 92,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 4
  }),
  Level: new Level({
    x: -150,
    y: -70,
    direction: -90,
    costumeNumber: 1,
    size: 200,
    visible: false,
    layerOrder: 6
  }),
  PlayButton: new PlayButton({
    x: 0,
    y: -75,
    direction: 90,
    costumeNumber: 1,
    size: 140,
    visible: false,
    layerOrder: 5
  }),
  Cloud: new Cloud({
    x: -300,
    y: 0,
    direction: 90,
    costumeNumber: 4,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Background: new Background({
    x: -200,
    y: -120,
    direction: -90,
    costumeNumber: 1,
    size: 150,
    visible: false,
    layerOrder: 2
  }),
  BadThings: new BadThings({
    x: -150,
    y: -70,
    direction: 90,
    costumeNumber: 1,
    size: 200,
    visible: false,
    layerOrder: 7
  }),
  Portal: new Portal({
    x: 250,
    y: -220,
    direction: 41,
    costumeNumber: 1,
    size: 150,
    visible: false,
    layerOrder: 3
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
