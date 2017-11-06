export class Point{
  x: number;
  y: number;

  constructor(x:number, y:number){
    this.x = x;
    this.y = y;
  }
  get pointX():number{
    return this.x;
  }
  get pointY():number{
    return this.y;
  }
  set pointX(x:number){
    this.x = x;
  }
  set pointY(y:number){
    this.y = y;
  }

}


