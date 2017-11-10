import { Component, ViewChild } from '@angular/core';
import {Platform, ModalController, ModalOptions } from 'ionic-angular';
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

  CIRC_RADIUS: number = 15;
  LEVELS_AVAILABLE: number = 12;
  CIRCLE_COLOUR: string = "white";
  LINE_WIDTH:number = 4;



  ctx: any;
  currentLevel: number;
  canvasHeight: number;
  canvasWidth: number;
  currentPoint: Point;
  newPoint: Point = new Point(0,0);
  circleLevels: LevelCircles[] = new Array();

  constructor(private platform: Platform, private modal: ModalController ) {
    this.currentLevel = 1;
    this.canvasHeight = 1000;
    this.canvasWidth = platform.width();

    this.currentPoint = new Point(this.canvasWidth/11, 50);


  }

  ngAfterViewInit(){
    this.ctx = this.smileCanvas.nativeElement.getContext('2d');
    this.ctx.lineWidth = this.LINE_WIDTH;
    this.drawBoard();

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
      //returned null... will default to handle moving the canvas..
    }
    else{
      //returned a valid click of a circle....
      const myModalOptions: ModalOptions = {
        showBackdrop: true,
        enableBackdropDismiss: false,
        cssClass: '' //Could add a class for modal animation later perhaps?
      };
      const myModalData = {
        level: result.level
      };
      const myModal = this.modal.create('ModalPage', {data: myModalData}, myModalOptions);
      myModal.present();
    }
  }

  /*
  @param clickPoint: Point - The currentPoint location of where the end user has clicked.
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
  @Param circlePoint: Point - The currentPoint location of the center of a circle
  @Param clickPoint: Point - The currentPoint location of where the end user has clicked.
  @Return: Returns the Distance^2 of the two points.
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
    this.ctx.fillStyle = this.CIRCLE_COLOUR;
    this.ctx.globalCompositeOperation = 'source-over'; //Used to draw circle on top of line
    this.ctx.fill();
    this.ctx.globalCompositeOperation = 'destination-over'; //When line is called later, it will appear behind circle.
  }

  drawLine(newPoint:Point){
    this.ctx.beginPath();
    this.ctx.moveTo(this.currentPoint.x, this.currentPoint.y);
    this.ctx.lineTo(newPoint.x, newPoint.y);
    this.currentPoint.x = newPoint.x;
    this.currentPoint.y = newPoint.y;
    this.ctx.stroke();
  }

  bezierCurveRight(newPoint:Point){
    this.ctx.beginPath();
    this.ctx.moveTo(this.currentPoint.x, this.currentPoint.y);
    this.ctx.bezierCurveTo(this.currentPoint.x+this.canvasWidth/8, this.currentPoint.y + 50,
      this.currentPoint.x+this.canvasWidth/11, this.currentPoint.y+100, newPoint.x, newPoint.y);
    this.currentPoint.x = newPoint.x;
    this.currentPoint.y = newPoint.y;
    this.ctx.stroke();
  }
  bezierCurveLeft(newPoint:Point){
    this.ctx.beginPath();
    this.ctx.moveTo(this.currentPoint.x, this.currentPoint.y);
    this.ctx.bezierCurveTo(this.currentPoint.x-this.canvasWidth/8, this.currentPoint.y + 50,
      this.currentPoint.x-this.canvasWidth/11, this.currentPoint.y+100, newPoint.x, newPoint.y);
    this.currentPoint.x = newPoint.x;
    this.currentPoint.y = newPoint.y;
    this.ctx.stroke();
  }


  /*
  Utility function to set the new Points values
  @Param: x: The x value for new Point
  @Param: y: The y value for new Point
  @return: Returns the reference to newPoint.
   */
  setNewPoint(x:number, y:number){
    this.newPoint.x = x;
    this.newPoint.y = y;

    return this.newPoint;

  }



  drawBoard(){
    let directionRight = true;
    this.drawCircle(this.currentPoint);
    for(let i=1; i<this.LEVELS_AVAILABLE; i++){
      if((this.currentPoint.x + (this.canvasWidth / 5) > this.canvasWidth)){
        directionRight = false;
      }
      else if((this.currentPoint.x - (this.canvasWidth / 5) < 0)){
        directionRight = true;
      }
      if(directionRight){
        if(i%5 === 0){
          this.bezierCurveLeft(this.setNewPoint(this.currentPoint.x,
            this.currentPoint.y + (this.canvasHeight/8) ));
        }
        else {
          this.drawLine(this.setNewPoint(this.currentPoint.x + (this.canvasWidth / 5), this.currentPoint.y));
        }
        this.drawCircle(this.currentPoint);
      }
      else{
        if(i%5 ===0){
          this.bezierCurveRight(this.setNewPoint(this.currentPoint.x, this.currentPoint.y + (this.canvasHeight/8)))
        }
        else{
          this.drawLine(this.setNewPoint(this.currentPoint.x - (this.canvasWidth / 5), this.currentPoint.y));

        }
        this.drawCircle(this.currentPoint);
      }

    }




  }





}
