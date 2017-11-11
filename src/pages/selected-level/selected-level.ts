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
startTimer:Date;
quizIncomplete:boolean;

  constructor(private navCtrl: NavController, private navParams: NavParams, private modal:ModalController) {
    this.finishedQuestionArray = new Array();
    this.quizIncomplete = true;
    console.log("hello from constructor!");
    this.startTimer = new Date();
  }

  ionViewDidLoad() {
    console.log("how many times is this getting called?");
    console.log("Hello from selected level page!!!");
    let data = this.navParams.get('questions');
    if(data) {
      this.startingQuestionArray = data;
    }
    console.log(this.startingQuestionArray);
    this.setNextQuestion();
  }

  /*
  Function used for when user answers question
  @Param: Boolean, true or false, true if user swiped right, false if swipe left.
  //Will be used to determine time taken to answer question, calculate formula for points


  At the moment function just sets users answer to true or false.
   */
  handleAnswer(answer:boolean){
    this.currentQuestion.playerAnswer = answer;

    //When user answers set the questions endtime to current date.
    this.currentQuestion.endTime = new Date();
    this.delegateToModal();
  }

  /*
  Handles event for when user swipes Left.
   */
  swipeLeftEvent(event){
    this.handleAnswer(false);
    //Add some other logic here eventually...
  }

  /*
  Handles event for when user swipes Right.
   */
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
    myModal.onDidDismiss(data => {
      this.setNextQuestion(); // Ensures that this function only runs when modal is closed
    });
    myModal.present();

  }


  /*
  Function to set the next question
   */
  setNextQuestion(){
    if(this.startingQuestionArray.length === 0){
      //When this changes, the view changes, see selected-level.html
      this.quizIncomplete = false;
    }
    else{
      if(!this.currentQuestion){ //If current Question is not null.
        this.finishedQuestionArray.push(this.currentQuestion);
      }
      this.currentQuestion = this.startingQuestionArray.pop();
      this.questionMessage = this.currentQuestion.questionMessage;
      this.questionCategory = this.currentQuestion.category;

      console.log("This about to get called?");

     this.currentQuestion.startTime = new Date();
    }
  }


  /*
  Function for when quiz is finished.
  For now just releases control of view back to DisplayLevelModalPage of current level that was selected
  before selecting level.
   */
  handleFinishedQuiz(){
    console.log("no more Questions..");
    this.navCtrl.pop();
  }


}
