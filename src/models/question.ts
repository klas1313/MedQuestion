import {QuestionInterface} from "./interfaces/question-interface";

export class Question implements QuestionInterface{
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

  constructor(questionMessage:string, answerMessage:string, answer:boolean,
              category:string, difficulty:"Easy"|"Medium"|"Hard", source:string,
              added:Date, contributor:string ){

    this._questionMessage = questionMessage;
    this._answerMessage = answerMessage;
    this._answer = answer;
    this._category = category;
    this. _difficulty = difficulty;
    this._source = source;
    this._added = added;
    this._contributor = contributor;
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
  set startTime(time){ this._startTime = time; }
  set endTime(time){ this._endTime = time; }
  set playerAnswer(answer:boolean){ this._playerAnswer = answer; }
  get playerAnswer(){ return this._playerAnswer; }

  calculatePoints(){}


}
