import { Point } from './point';

export class LevelCircles {
  level: number;
  center: Point;

  constructor(level:number, x:number, y:number){
    this.level = level;
    this.center = new Point(x, y);
  }
}
