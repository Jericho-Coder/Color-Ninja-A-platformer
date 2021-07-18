import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Menu", "./Stage/costumes/Menu.svg", { x: 249, y: 187.5 }),
      new Costume("Start", "./Stage/costumes/Start.svg", {
        x: 359.702525,
        y: 268.97749
      }),
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 350.6006006006005,
        y: 323.09309309309305
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      )
    ];

    this.vars.myVariable = 0;
    this.vars.level = 2;
    this.vars.yVelocity = -4;
    this.vars.xVelocity = 0;
    this.vars.lives = -2271;
    this.vars.scrollX = 35;
    this.vars.scrollY = 22;
    this.vars.portal = "no";
  }

  *whenGreenFlagClicked() {
    this.costume = "Menu";
  }

  *whenIReceiveStart() {
    this.costume = "Start";
  }

  *whenIReceiveNextLevel() {
    this.costume = "backdrop1";
  }
}
