import { Point } from "./Point";

export class Wave {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  index: number;
  totalPoints: number;
  points: Point[];
  pointGap: number;
  color: string;
  constructor(index: number, totalPoints: number, color: string) {
    this.width = this.height = this.centerX = this.centerY = 0;
    this.points = [];
    this.index = index;
    this.pointGap = 0;
    this.totalPoints = totalPoints;
    this.color = color;
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;

    this.centerX = width / 2;
    this.centerY = height / 3;

    this.pointGap = width / (this.totalPoints - 3);

    this.init();
  }

  init(): void {
    this.points = [];

    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(this.index + i, this.pointGap * i, this.centerY);
      this.points[i] = point;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 0; i < this.totalPoints; i++) {
      if (i < this.totalPoints - 1) {
        this.points[i].update();
      }

      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.width, this.height);
    ctx.lineTo(this.points[0].x, this.height);
    ctx.fill();
    ctx.closePath();
  }
}
