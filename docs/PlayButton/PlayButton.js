import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class PlayButton extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("button2-a", "./PlayButton/costumes/button2-a.svg", {
        x: 60.00000000000003,
        y: 30.247450129070586
      })
    ];

    this.sounds = [new Sound("pop", "./PlayButton/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.goto(0, -75);
    while (true) {
      if (this.touching("mouse")) {
        this.size = 140;
      } else {
        this.size = 120;
      }
      yield;
    }
  }

  *whenthisspriteclicked() {
    this.broadcast("Start");
    this.visible = false;
  }
}
