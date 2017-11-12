import { Component } from '@angular/core';

/**
 * Generated class for the QuestionCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'question-card',
  templateUrl: 'question-card.html'
})
export class QuestionCardComponent {

  text: string;

  constructor() {
    console.log('Hello QuestionCardComponent Component');
    this.text = 'Hello World';
  }

}
