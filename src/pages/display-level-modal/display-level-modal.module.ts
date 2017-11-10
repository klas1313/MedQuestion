import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayLevelModalPage } from './display-level-modal';

@NgModule({
  declarations: [
    DisplayLevelModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayLevelModalPage),
  ],
})
export class DisplayLevelModalPageModule {}
