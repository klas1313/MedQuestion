export interface QuestionInterface{
  _questionMessage:string;
  _answerMessage: string;
  _answer: boolean;
  _category: string;
  _difficulty: "Easy" | "Medium" | "Hard";
  _source: string;
  _added: Date;
  _contributor: string;
}
