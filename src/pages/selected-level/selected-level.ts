import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions } from 'ionic-angular';

import { Question } from "../../models/question";

/**
 * Generated class for the SelectedLevelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selected-level',
  templateUrl: 'selected-level.html',
})
export class SelectedLevelPage {

level:number;
correctQuestions:number;
questionMessage:string;
questionCategory:string;
playerAnswer:boolean;
startingQuestionArray:Question[];
finishedQuestionArray:Question[];
currentQuestion:Question;
quizIncomplete:boolean;

  constructor(private navCtrl: NavController, private navParams: NavParams, private modal:ModalController) {
    this.finishedQuestionArray = new Array();
    this.quizIncomplete = true;
  }

  ionViewDidLoad() {
    console.log("Ion view did load getting executed!!!");
    let data = this.navParams.get('questions');
    if(data) {
      this.startingQuestionArray = data;
    }
    console.log(this.startingQuestionArray);
    this.setNextQuestion();

  }
  handleAnswer(answer:boolean){
    this.currentQuestion.playerAnswer = answer;
    this.delegateToModal();
  }

  swipeLeftEvent(event){
    this.handleAnswer(false);
    //Add some other logic here eventually...
  }

  swipeRightEvent(event){
    this.handleAnswer(true);
    //Add some other logic here eventually...
  }

  delegateToModal(){
    const myModalOptions: ModalOptions = {
      showBackdrop: true,
      enableBackdropDismiss: false,
      cssClass: '' //Could add a class for modal animation later perhaps.
    };
    const myModalData = this.currentQuestion;
    const myModal = this.modal.create('AnswerModalPage', {data: myModalData}, myModalOptions);
    myModal.present();
    this.setNextQuestion();


  }
  setNextQuestion(){
    if(this.startingQuestionArray.length === 0){
      this.quizIncomplete = false;
    }
    else{
      if(!this.currentQuestion){ //If current Question is not null.
        this.finishedQuestionArray.push(this.currentQuestion);
      }
      this.currentQuestion = this.startingQuestionArray.pop();
      this.questionMessage = this.currentQuestion.questionMessage;
      this.questionCategory = this.currentQuestion.category;
    }
  }

  handleFinishedQuiz(){
    console.log("no more Questions..");
    this.navCtrl.pop();
  }







}
