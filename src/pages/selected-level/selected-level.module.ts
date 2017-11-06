import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectedLevelPage } from './selected-level';

@NgModule({
  declarations: [
    SelectedLevelPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectedLevelPage),
  ],
})
export class SelectedLevelPageModule {}
