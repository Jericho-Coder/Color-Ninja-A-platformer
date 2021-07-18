import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Portal extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume2", "./Portal/costumes/costume2.svg", {
        x: 38.646450000000016,
        y: 38.64644999999999
      })
    ];

    this.sounds = [new Sound("pop", "./Portal/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.moveBehind();
    this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
    this.costume = "costume2";
    this.size = 150;
  }

  *whenIReceiveStart() {
    this.visible = true;
    while (true) {
      this.direction += 10;
      this.goto(
        600 - this.stage.vars.scrollX * 10,
        0 - this.stage.vars.scrollY * 10
      );
      if (this.stage.vars.scrollX > 30) {
        this.visible = true;
      } else {
        this.visible = false;
      }
      yield;
    }
  }

  *whenIReceiveNextLevel() {
    this.visible = false;
    /* TODO: Implement stop all */ null;
  }
}
