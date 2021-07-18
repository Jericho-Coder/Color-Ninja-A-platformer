import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Outfit  ", "./Player/costumes/Outfit  .svg", {
        x: 56.17789097818883,
        y: 47.78967663391106
      })
    ];

    this.sounds = [new Sound("Meow", "./Player/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Start" }, this.whenIReceiveStart),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start" },
        this.whenIReceiveStart2
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      )
    ];
  }

  *whenIReceiveStart() {
    this.size = 50;
    this.costume = "Outfit  ";
    this.direction = 90;
    this.visible = true;
    this.stage.vars.xVelocity = 0;
    this.stage.vars.yVelocity = 0;
    this.goto(-199, 1);
    while (true) {
      if (this.keyPressed("right arrow") || this.keyPressed("d")) {
        this.stage.vars.xVelocity += 1;
        this.direction = -90;
      }
      if (this.keyPressed("left arrow") || this.keyPressed("a")) {
        this.stage.vars.xVelocity += -1;
        this.direction = 90;
      }
      this.stage.vars.xVelocity = this.stage.vars.xVelocity * 0.9;
      this.x += this.stage.vars.xVelocity;
      if (this.touching(this.sprites["Level"].andClones())) {
        this.y += 1;
        if (this.touching(this.sprites["Level"].andClones())) {
          this.y += 1;
          if (this.touching(this.sprites["Level"].andClones())) {
            this.y += 1;
            if (this.touching(this.sprites["Level"].andClones())) {
              this.y += 1;
              if (this.touching(this.sprites["Level"].andClones())) {
                this.y += 1;
                if (this.touching(this.sprites["Level"].andClones())) {
                  this.x += this.stage.vars.xVelocity * -0.9;
                  this.y += 5;
                  if (this.keyPressed("up arrow") || this.keyPressed("w")) {
                    if (this.stage.vars.xVelocity > 0) {
                      this.stage.vars.xVelocity = -5;
                    } else {
                      this.stage.vars.xVelocity = 5;
                    }
                    this.stage.vars.yVelocity = 10;
                  } else {
                    this.stage.vars.xVelocity = 0;
                  }
                }
              }
            }
          }
        }
      }
      this.stage.vars.yVelocity += -1;
      this.y += this.stage.vars.yVelocity;
      if (this.touching(this.sprites["Level"].andClones())) {
        this.y += this.stage.vars.yVelocity * -1;
        this.stage.vars.yVelocity = 0;
      }
      this.y += -1;
      if (this.touching(this.sprites["Level"].andClones())) {
        if (this.keyPressed("up arrow") || this.keyPressed("w")) {
          this.stage.vars.yVelocity += 17;
        }
      }
      this.y += 1;
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.stage.vars.portal = "no";
    this.costume = "Outfit  ";
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.size = 75;
    this.effects.clear();
    this.goto(0, 20);
    this.effects.color = 0;
    this.visible = true;
    while (true) {
      if (
        this.keyPressed("left arrow") ||
        this.keyPressed("right arrow") ||
        this.keyPressed("up arrow")
      ) {
        this.createClone();
      }
      yield;
    }
  }

  *whenthisspriteclicked() {
    if (this.stage.costume.name == "Menu") {
      for (let i = 0; i < 10; i++) {
        this.size += 1;
        yield;
      }
      this.effects.color += 20;
      for (let i = 0; i < 10; i++) {
        this.size += -1;
        yield;
      }
    }
  }

  *whenIReceiveReset() {
    this.visible = false;
    this.stage.vars.portal = "no";
    this.direction = 90;
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.size = 50;
    yield* this.wait(1);
    this.goto(-199, 1);
    this.visible = true;
  }

  *whenIReceiveStart2() {
    while (true) {
      if (this.touching(this.sprites["Portal"].andClones())) {
        this.stage.vars.portal = "yes";
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Portal"].y - this.y,
            this.sprites["Portal"].x - this.x
          )
        );
        this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
        for (let i = 0; i < 10; i++) {
          this.stage.vars.xVelocity = 0;
          this.stage.vars.yVelocity = 0;
          this.direction += 10;
          this.size += -5;
          this.move(
            Math.hypot(
              this.sprites["Portal"].x - this.x,
              this.sprites["Portal"].y - this.y
            ) / 10
          );
          yield* this.wait(0.1);
          yield;
        }
        this.stage.vars.level += 1;
        this.broadcast("Reset");
        this.broadcast("Next Level");
      }
      if (this.stage.vars.scrollY < -25) {
        this.broadcast("Reset");
      }
      yield;
    }
  }

  *startAsClone() {
    this.size += -10;
    this.effects.brightness = -100;
    for (let i = 0; i < 50; i++) {
      this.effects.ghost += 15;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveNextLevel() {
    this.visible = false;
  }
}
