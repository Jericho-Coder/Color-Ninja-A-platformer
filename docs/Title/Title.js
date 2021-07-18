import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Title extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "cooltext381679921625735",
        "./Title/costumes/cooltext381679921625735.svg",
        { x: 147, y: 17.056962025316466 }
      )
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart)
    ];
  }

  *whenGreenFlagClicked() {
    this.direction = 90;
    this.goto(0, 100);
    this.visible = true;
    while (true) {
      for (let i = 0; i < 5; i++) {
        this.direction += 1;
        yield* this.wait(0.1);
        this.effects.color += 10;
        yield;
      }
      for (let i = 0; i < 5; i++) {
        this.direction -= 1;
        yield* this.wait(0.1);
        this.effects.color += 10;
        yield;
      }
      yield;
    }
  }

  *whenIReceiveStart() {
    this.visible = false;
  }
}
