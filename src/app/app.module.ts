import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Storage } from "@ionic/storage";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import { AnimatorModule } from "css-animator";
import { GameboardComponent } from "../components/gameboard/gameboard";

//import { SelectedLevelPage } from "../pages/selected-level/selected-level";

//Do you see this comment jeong?
//Yes


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GameboardComponent,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
