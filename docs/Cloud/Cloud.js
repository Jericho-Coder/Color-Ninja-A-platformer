import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cloud extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Cloud-a", "./Cloud/costumes/Cloud-a.svg", { x: 76, y: 19 }),
      new Costume("Cloud-c", "./Cloud/costumes/Cloud-c.svg", { x: 97, y: 9 }),
      new Costume("Cloud-b", "./Cloud/costumes/Cloud-b.svg", { x: 101, y: 20 }),
      new Costume("Cloud-d", "./Cloud/costumes/Cloud-d.svg", { x: 87, y: 21 })
    ];

    this.sounds = [new Sound("pop", "./Cloud/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.moveBehind();
    this.goto(-300, 0);
  }

  *whenIReceiveStart() {
    while (true) {
      this.moveBehind();
      this.createClone();
      yield* this.wait(this.random(0.5, 2));
      yield;
    }
  }

  *startAsClone() {
    this.visible = false;
    this.goto(-300, this.random(0, 150));
    this.costume = this.random(1, 4);
    this.visible = true;
    yield* this.glide(this.random(0.5, 2.5), 300, this.y);
    this.deleteThisClone();
  }
}
