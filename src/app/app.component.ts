import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';

import { TabsPage } from '../pages/tabs/tabs';
import { LoggerServiceProvider } from '../providers/logger-service/logger-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _af: FirebaseApp,
    private _logger: LoggerServiceProvider) {

    if (platform.is('cordova')) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
    }

    this.initializeApp();
  }

  initializeApp() {
    this._logger.log("App getting to initialize");
    const unsubscribe = this._af.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        this.rootPage = TabsPage;
        unsubscribe();
      }
    });
  }
}
