import { Component, ViewChild } from '@angular/core';
import {Platform} from 'ionic-angular';
import { Point } from "../../models/point";
import { LevelCircles } from "../../models/level-circles";

/**
 * Generated class for the LevelsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'levels',
  templateUrl: 'levels.html'
})
export class LevelsComponent {
  @ViewChild('levelCanvas') smileCanvas;

  //These specific to example.
  //smileHeight: number = 250;
  //rating: number = Math.round(100 - ((250 - this.smileHeight) / 2));
  ctx: any;
  levels: number;
  currentLevel: number;
  canvasHeight: number;
  canvasWidth: number;
  CIRC_RADIUS: number;
  point: Point;
  circleLevels: LevelCircles[];

  constructor(platform: Platform) {
    this.circleLevels = new Array();
    this.CIRC_RADIUS = 10;
    this.currentLevel = 1;
    this.levels = 12;
    this.canvasHeight = 1000;
    this.canvasWidth = platform.width();
    console.log(platform.width());

    console.log(this.canvasWidth);
    console.log('Hello LevelsComponent Component');
    this.point = new Point(this.canvasWidth/11, 50);


  }

  ngAfterViewInit(){
    this.ctx = this.smileCanvas.nativeElement.getContext('2d');

    this.drawBoard();

    //this.ctx.rotate((90 * Math.PI)/180);
    // let hammer = new window['Hammer'](this.smileCanvas.nativeElement);
    // hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });
    //
    // hammer.on('pan', (ev) => {
    //   this.handlePan(ev);
    // });
    //this.drawLine((this.canvasWidth*70)/100, this.point.y);



  }

  /*
  Event listener bound to the canvas.
   */
  userClicked(event){
    let userClick = new Point(event.offsetX, event.offsetY);
    let result = this.determineCircleClicked(userClick);
    if(!result){
      console.log("user clicked outside of circle");
      return;
      //returned null... handle moving the canvas..
    }
    else{
      //returned a valid click of a circle....
      console.log("User clicked within circle!");
      console.log("Circle level is : "+ result.level);
    }
  }

  /*
  @param clickPoint: Point - The point location of where the end user has clicked.
  @return - Returns the circle level object, if a valid click on circle is found, otherwise returns null;
   */
  determineCircleClicked(clickPoint:Point){
    const squaredRadius = this.CIRC_RADIUS * this.CIRC_RADIUS;
    //Loop over all of our levels, See which one is closest
    for(let i=0; i<this.circleLevels.length; i++){
      if(this.findDistance(this.circleLevels[i].center, clickPoint) <= squaredRadius){
        return this.circleLevels[i];
      }
    }
    return null; //Looped over all circles and could not find a matched within the points.
  }

  /*
  Finds distance between two points using pythagorean theorem.
  @Param circlePoint: Point - The point location of the center of a circle
  @Param clickPoint: Point - The point location of where the end user has clicked.
   */
  findDistance(circlePoint:Point, clickPoint:Point){
    return ((clickPoint.x - circlePoint.x) * (clickPoint.x - circlePoint.x)) +
      ((clickPoint.y - circlePoint.y) * (clickPoint.y - circlePoint.y));
  }

  drawCircle(point:Point){
    let circleLevel = new LevelCircles(this.currentLevel, point.x, point.y);
    this.circleLevels.push(circleLevel);
    this.currentLevel++;
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, this.CIRC_RADIUS, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
  }

  drawLine(newPoint:Point){
    this.ctx.beginPath();
    this.ctx.moveTo(this.point.x, this.point.y);
    this.ctx.lineTo(newPoint.x, newPoint.y);
    this.point.x = newPoint.x;
    this.point.y = newPoint.y;
    this.ctx.stroke();
  }

  bezierCurveRight(newPoint:Point){
    this.ctx.beginPath();
    this.ctx.moveTo(this.point.x, this.point.y);
    this.ctx.bezierCurveTo(this.point.x+this.canvasWidth/8, this.point.y + 50,
      this.point.x+this.canvasWidth/11, this.point.y+100, newPoint.x, newPoint.y);
    this.point.x = newPoint.x;
    this.point.y = newPoint.y;
    this.ctx.stroke();
  }
  bezierCurveLeft(newPoint:Point){
    this.ctx.beginPath();
    this.ctx.moveTo(this.point.x, this.point.y);
    this.ctx.bezierCurveTo(this.point.x-this.canvasWidth/8, this.point.y + 50,
      this.point.x-this.canvasWidth/11, this.point.y+100, newPoint.x, newPoint.y);
    this.point.x = newPoint.x;
    this.point.y = newPoint.y;
    this.ctx.stroke();
  }



  drawBoard(){
    let directionRight = true;
    this.drawCircle(this.point);
    for(let i=1; i<this.levels; i++){
      if((this.point.x + (this.canvasWidth / 5) > this.canvasWidth)){
        directionRight = false;
      }
      else if((this.point.x - (this.canvasWidth / 5) < 0)){
        directionRight = true;
      }
      if(directionRight){
        if(i%5 === 0){
          this.bezierCurveLeft(new Point(this.point.x, this.point.y + (this.canvasHeight/8)))
        }
        else {
          this.drawLine(new Point(this.point.x + (this.canvasWidth / 5), this.point.y));
        }
        this.drawCircle(this.point);
      }
      else{
        if(i%5 ===0){
          this.bezierCurveRight(new Point(this.point.x, this.point.y + (this.canvasHeight/8)))
        }
        else{
          this.drawLine(new Point(this.point.x - (this.canvasWidth / 5), this.point.y));

        }
        this.drawCircle(this.point);
      }

    }




  }





}
