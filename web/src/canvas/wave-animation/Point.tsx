export class Point {
  x: number;
  y: number;
  fixedY: number;
  speed: number;
  cur: number;
  max: number;
  constructor(index: number, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.006;
    this.cur = index;
    this.max = Math.random() * 50 + 20;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
  }
}
