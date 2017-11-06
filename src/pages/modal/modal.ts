import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  level:number;
  target:number;

  constructor(private view: ViewController, private navParams: NavParams) {
    this.target = 3000;
  }

  ionViewDidLoad() {
    const data = this.navParams.get('data');
    this.level = data.level;
    console.log('ionViewDidLoad ModalPage');
  }

  closeModal(){
    this.view.dismiss();
  }

}
