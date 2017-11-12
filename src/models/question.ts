import {QuestionInterface} from "./interfaces/question-interface";

export class Question implements QuestionInterface{
  static _pointSpree: number = 0;
  static _POINT_Y_INTERCEPT:number = 600;
  static _SLOPE:number = (Question._POINT_Y_INTERCEPT/30) * -1 ;
  _DIFFICULTY_MODIFIER:number;
  _questionMessage:string;
  _answerMessage: string;
  _answer: boolean;
  _category: string;
  _difficulty: "Easy" | "Medium" | "Hard";
  _source: string;
  _added: Date;
  _contributor: string;
  _startTime:Date;
  _endTime:Date;
  _points:number;
  _playerAnswer:boolean;

  //Refactor all of this

  constructor(questionMessage:string, answerMessage:string, answer:boolean,
              category:string, difficulty:"Easy"|"Medium"|"Hard", source:string,
              added:Date, contributor:string ){

    this._questionMessage = questionMessage;
    this._answerMessage = answerMessage;
    this._answer = answer;
    this._category = category;
    this._difficulty = difficulty;
    this._source = source;
    this._added = added;
    this._contributor = contributor;

    switch(this._difficulty){
      case "Easy":
        this._DIFFICULTY_MODIFIER = 1;
        break;
      case "Medium":
        this._DIFFICULTY_MODIFIER = 1.5;
        break;
      case "Hard":
        this._DIFFICULTY_MODIFIER = 2;
        break;
    }

  }
  get questionMessage() {return this._questionMessage;}
  get answerMessage(){ return this._answerMessage;}
  get answer() { return this._answer; }
  get category() { return this._category; }
  get difficulty() { return this._difficulty; }
  get source() { return this._source; }
  get added() { return this._added; }
  get contributor() { return this._contributor; }
  set points(points){ this._points = points; }
  get points(){return this._points;  }
  set startTime(time){ this._startTime = time; }
  get startTime(){return this._startTime;}
  set endTime(time){ this._endTime = time; }
  set playerAnswer(answer:boolean){ this._playerAnswer = answer; }
  get playerAnswer(){ return this._playerAnswer; }
  //set static pointSpree(pointSpree){ Question._pointSpree = pointSpree; }
  //get static pointSpree(){return Question._pointSpree;}

  calculateTimeToAnswer(){
   // console.log("end time is : "+this._endTime.getTime());
    //console.log("start time is : "+this._startTime.getTime());
    return (this._endTime.getTime() - this._startTime.getTime()) / 1000;
  }

  calculatePoints(){
    let questionTime = this.calculateTimeToAnswer();
    console.log(this.playerAnswer);
    console.log(this.answer);
    //If player answered wrong, or took too long to answer, set points to 0;
    if(this.playerAnswer != this.answer || questionTime > 30){
      this.points = 0;
      return;
    }
    //If they answered right and before time runs out....
    this.points = Math.round(((Question._SLOPE * questionTime)+ Question._POINT_Y_INTERCEPT) *
      (this._DIFFICULTY_MODIFIER + Question._pointSpree));

  }


}
