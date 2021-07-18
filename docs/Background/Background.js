import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Background extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume2", "./Background/costumes/costume2.svg", {
        x: 206.3146581831556,
        y: 158.39257
      })
    ];

    this.sounds = [new Sound("pop", "./Background/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.level = 1;
    this.stage.vars.scrollY = 0;
    this.stage.vars.scrollX = 0;
    this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
    this.costume = "costume2";
    this.visible = false;
  }

  *whenGreenFlagClicked2() {
    this.costume = "costume2";
  }

  *whenIReceiveStart() {
    this.moveBehind();
    this.visible = true;
    while (true) {
      this.goto(
        150 - this.stage.vars.scrollX * 10,
        100 - this.stage.vars.scrollY * 10
      );
      yield;
    }
  }

  *whenIReceiveReset() {
    this.visible = true;
    yield* this.glide(1, 150, 100);
  }

  *whenIReceiveNextLevel() {
    this.visible = false;
  }
}
