import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
//import { GameboardComponent } from "../../components/gameboard/gameboard";

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    //GameboardComponent,
    IonicPageModule.forChild(HomePage)
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
