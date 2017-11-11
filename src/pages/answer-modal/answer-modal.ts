import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AnswerModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer-modal',
  templateUrl: 'answer-modal.html',
})
export class AnswerModalPage {
  answerMessage:string;
  correctAnswer:string;
  playerAnswer:string;
  timeTakenToAnswer:number;
  pointsAwarded:number;

  constructor(private navCtrl: NavController, private navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    let data = this.navParams.get('data');
    this.setCorrectAnswerString(data.answer);
    this.answerMessage = data.answerMessage;
    this.setPlayerAnswerString(data.playerAnswer);
    this.setTimeTakenToAnswer(data.calculateTimeToAnswer());
    console.log(data.startTime);
    data.calculatePoints();
    this.pointsAwarded = data.points;
    console.log(data.difficulty);

  }



  setTimeTakenToAnswer(time:number){

    this.timeTakenToAnswer = time;
  }

  setCorrectAnswerString(questionAnswer: boolean){
    if(questionAnswer){
      this.correctAnswer = "True";
    }
    else{
      this.correctAnswer = "False";
    }
  }
  setPlayerAnswerString(playerAnswer:boolean){
    if(playerAnswer){
      this.playerAnswer = "True";
    }
    else{
      this.playerAnswer = "False";
    }
  }


  dismiss(){
    this.view.dismiss();
  }

}
