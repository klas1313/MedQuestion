import { Point } from './point';
import {CircleInterface} from "./interfaces/circle-interface";
export class LevelCircles implements  CircleInterface{
  _level: number;
  _center: Point;

  constructor(level:number, x:number, y:number){
    this._level = level;
    this._center = new Point(x, y);
  }
  get center(){
    return this._center;
  }
  get level(){
    return this._level
  }

}
