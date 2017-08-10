import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { QuoteDetailPageModule } from "../pages/quote-detail/quote-detail.module";
import { ListPage } from "../pages/list/list";
import { ListPageModule } from "../pages/list/list.module";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database"

export const firebaseconfig = {
    apiKey: "AIzaSyAniyfWv8x4BRCApeNY8cjnYvNwdx-pTGY",
    authDomain: "kurianj-movie-quotes-a3a17.firebaseapp.com",
    databaseURL: "https://kurianj-movie-quotes-a3a17.firebaseio.com",
    projectId: "kurianj-movie-quotes-a3a17",
    storageBucket: "kurianj-movie-quotes-a3a17.appspot.com",
    messagingSenderId: "188917425284"
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    QuoteDetailPageModule,
    ListPageModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
