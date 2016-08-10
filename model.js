"use strict";

class Ball {
  constructor(id, x = 0, y = 0, vx = 10, vy = 0) {
    this.id = id;
    this.moveTo(x, y);
    this.velocity(vx, vy);
  }

  move() {
    this.moveBy(this.vx, this.vy);
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  velocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }

  accelerate(dvx, dvy) {
    this.vx += dvx;
    this.vy += dvy;
  }
}

class Stage {
  constructor(level) {
    this.level = level;
    this.gravity = this.calcGravity();
    this.threshold = this.calcThreshold();
    this.land = this.calcLand();
  }

  // calc系メソッドの中身は適当

  calcGravity() {
    return 0.5 * this.level;
  }

  calcThreshold() {
    return 20 * this.level;
  }

  calcLand() {
    let w = 400 - 50 * this.level;
    return {x: Math.random() * (400 - w) + 400, y: 400, width: w};
  }
}
