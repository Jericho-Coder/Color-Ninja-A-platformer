import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BadThings extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./BadThings/costumes/costume1.svg", {
        x: 107.51044999999999,
        y: 63.607447695099864
      })
    ];

    this.sounds = [new Sound("pop", "./BadThings/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      )
    ];
  }

  *whenIReceiveStart() {
    this.visible = true;
    this.costumeNumber += 1;
    while (true) {
      this.goto(
        200 - this.stage.vars.scrollX * 10,
        150 - this.stage.vars.scrollY * 10
      );
      if (
        this.touching(this.sprites["Player"].andClones()) ||
        Math.hypot(
          this.sprites["Player"].x - this.x,
          this.sprites["Player"].y - this.y
        ) < 5
      ) {
        this.broadcast("Reset");
        yield* this.glide(1, 200, 150);
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.size = 200;
  }

  *whenIReceiveNextLevel() {
    this.visible = false;
  }
}
