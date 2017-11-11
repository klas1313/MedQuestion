import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SelectedLevelPage } from "../selected-level/selected-level";
import questionData from '../../data/dummy-data';
import { Question } from "../../models/question";


/**
 * Generated class for the DisplayLevelModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-level-modal',
  templateUrl: 'display-level-modal.html',
})
export class DisplayLevelModalPage {
  level:number;
  target:number;
  instructions: string;
  levelQuestions:Question[];
  questionAvailable:boolean = false;


  constructor(private view: ViewController, private navParams: NavParams, private navCtrl:NavController) {
    this.levelQuestions = new Array();
    this.target = 3000;
    this.instructions = "You will be asked a series of True or false questions. Swipe" +
      " right to answer true, swipe left to answer false";
  }

  ionViewDidLoad() {
    let data = this.navParams.get('data');
    console.log("The selected Level is :" + data.level);
    this.level = data.level;
    let questions = this.getQuestionData(data.level);
    if(!questions){
      console.log("no questions found :(");
      this.instructions = "This level currently does not have any questions populated. Still " +
        "in development."
      return;
    }
    questions = this.shuffleQuestions(questions);
    this.populateLevelQuestions(questions);

    this.isQuestionAvailable();



  }

  populateLevelQuestions(questions){
    let q;
    for(let i=0; i<questions.length; i++){
      q = questions[i];
      this.levelQuestions.push(new Question(q.questionMessage, q.answerMessage,
        q.answer, q.category, q.difficulty, q.source, q.added, q.contributor));
    }
  }


  getQuestionData(level){
    let questions;
    for(let i=0; i<questionData.length; i++){
      if(questionData[i].levelNumber == level){
        questions = questionData[i].questions;
      }
    }
    return questions;
  }

  /*
  A function implementing the fisher-yates shuffle algorithm.
    Algorithm is O(N).
    For more information, see: https://bost.ocks.org/mike/shuffle/
    @param array: takes an array.
    @return array: returns array with elements randomized and shuffled.
   */
  shuffleQuestions(array){
    let currentIndex = array.length, tempValue, randomIndex;
    // While there remain elements to shuffle…
    while (currentIndex) {
      // Pick a remaining element…
      randomIndex = Math.floor(Math.random() * currentIndex--);
      // And swap it with the current element.
      tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }
    return array;
  }



  /*
  Function to determine if the levelQuestions array has been populated or not
  Sets instance variable true if levelQuestions array has been populated,
  else false if it has not.
   */
  isQuestionAvailable(){
    //Checks if questions loaded into array, if they are view will display play button
    this.questionAvailable = this.levelQuestions.length !== 0;
  }

  startQuestions(){
    if(this.levelQuestions.length == 0){
      console.log("no questions loaded in array, can't start!");
      return;
    }

    this.navCtrl.push('SelectedLevelPage', {questions: this.levelQuestions});

    //Start the questions...
    // console.log(this.levelQuestions.length);
    // console.log("we have questions! we can start!");
  }




  closeModal(){
    this.view.dismiss();
  }

  playLevel(){
    const myData = {
      level: this.level
    };
    this.navCtrl.push('SelectedLevelPage', {data: myData});
  }
}
