import { Wave } from "./Wave";

export class WaveGroup {
  totalWaves: number;
  totalPoints: number;
  color: string[];
  waves: Wave[];
  constructor() {
    this.totalWaves = 3;
    this.totalPoints = 6;
    this.color = [
      "rgba(255,255,255,0.4)",
      "rgba(255,195,220,0.2)",
      "rgba(255,255,255,0.1)",
    ];
    this.waves = [];

    for (let i = 0; i < this.totalWaves; i++) {
      this.waves.push(new Wave(i, this.totalPoints, this.color[i]));
    }
  }

  resize(width: number, height: number): void {
    for (let i = 0; i < this.totalWaves; i++) {
      this.waves[i].resize(width, height);
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.totalWaves; i++) {
      this.waves[i].draw(ctx);
    }
  }
}
