import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { LevelsComponent } from '../../components/levels/levels';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    LevelsComponent,
    IonicPageModule.forChild(HomePage)
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
