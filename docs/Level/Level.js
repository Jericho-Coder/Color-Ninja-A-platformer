import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Level extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Level-1", "./Level/costumes/Level-1.svg", {
        x: 239.75,
        y: 106.85998000000008
      })
    ];

    this.sounds = [new Sound("pop", "./Level/sounds/pop.wav")];

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
    this.costume = "Level-1";
    this.visible = false;
  }

  *whenGreenFlagClicked2() {
    this.costume = "Level-1";
  }

  *whenIReceiveStart() {
    this.visible = true;
    while (true) {
      this.goto(
        200 - this.stage.vars.scrollX * 10,
        150 - this.stage.vars.scrollY * 10
      );
      if (this.stage.vars.portal == "no") {
        if (this.sprites["Player"].x > 150) {
          this.stage.vars.scrollX += 1;
        }
        if (this.stage.vars.scrollX > 0) {
          if (this.sprites["Player"].x < -220) {
            this.stage.vars.scrollX += -1;
          }
        }
        if (!this.touching(this.sprites["Player"].andClones())) {
          if (this.sprites["Player"].y > 150) {
            this.stage.vars.scrollY += 1;
          }
          if (this.sprites["Player"].y < -150) {
            this.stage.vars.scrollY += -1;
          }
        }
      } else {
        null;
      }
      yield;
    }
  }

  *whenIReceiveReset() {
    this.visible = true;
    yield* this.glide(1, 200, 150);
    this.stage.vars.scrollX = 0;
    this.stage.vars.scrollY = 0;
  }

  *whenIReceiveNextLevel() {
    this.visible = false;
  }
}
