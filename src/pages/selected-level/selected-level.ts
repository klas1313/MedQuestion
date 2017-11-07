import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import questionData from '../../data/dummy-data';

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
  json:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectedLevelPage');
    let data = this.navParams.get('data');
    console.log("The selected Level is :" + data.level);

    console.log(questionData);




  }


}
