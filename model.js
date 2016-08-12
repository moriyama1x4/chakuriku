"use strict";

class Ball {
  constructor(id, x = 8, y = 200, vx = 5, vy = -5) {
    this.id = id;
    this.moveTo(x, y);
    this.velocity(vx, vy);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

/*
  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  } 
*/
  
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
    return 0.05 * this.level;
  }

  calcThreshold() {
    return 7 - this.level;
  }

  calcLand() {
    let w = 300 - 50 * this.level;
    return {x: Math.random() * (400 - w) + 400, y: 400, width: w};
  }
}
