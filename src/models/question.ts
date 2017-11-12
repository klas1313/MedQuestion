export class Question {
  static _pointSpree: number = 0;
  static _POINT_Y_INTERCEPT:number = 600;
  static _SLOPE:number = (Question._POINT_Y_INTERCEPT/30) * -1 ;
  DIFFICULTY_MODIFIER:number;
  questionMessage:string;
  answerMessage: string;
  answer: boolean;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  source: string;
  added: Date;
  contributor: string;
  startTime:Date;
  endTime:Date;
  points:number;
  playerAnswer:boolean;

  //Refactor all of this

  constructor(questionMessage:string, answerMessage:string, answer:boolean,
              category:string, difficulty:"Easy"|"Medium"|"Hard", source:string,
              added:Date, contributor:string ){

    this.questionMessage = questionMessage;
    this.answerMessage = answerMessage;
    this.answer = answer;
    this.category = category;
    this.difficulty = difficulty;
    this.source = source;
    this.added = added;
    this.contributor = contributor;

    switch(this.difficulty){
      case "Easy":
        this.DIFFICULTY_MODIFIER = 1;
        break;
      case "Medium":
        this.DIFFICULTY_MODIFIER = 1.25;
        break;
      case "Hard":
        this.DIFFICULTY_MODIFIER = 1.5;
        break;
    }

  }
  //set static pointSpree(pointSpree){ Question._pointSpree = pointSpree; }
  //get static pointSpree(){return Question._pointSpree;}

  calculateTimeToAnswer(){
   // console.log("end time is : "+this.endTime.getTime());
    //console.log("start time is : "+this.startTime.getTime());
    return (this.endTime.getTime() - this.startTime.getTime()) / 1000;
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
      (this.DIFFICULTY_MODIFIER + Question._pointSpree));

  }


}
