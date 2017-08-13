import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  user: { displayName: string, email: string, photoURL: string }
  constructor(public navCtrl: NavController, private auth: AuthProvider, private _logger: LoggerServiceProvider) {
    this._logger.log("AboutPage constructor");
    this.getUserInformation();
  }

  getUserInformation() {
    let user = this.auth.isAuthenticated();

    if (user) {
      this._logger.log(user);
      this.user = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : "http://placehold.it/300x300"
      }
    } else {
      this.user = {
        displayName: "",
        email: "",
        photoURL: "http://placehold.it/300x300"
      }
    }
  }

  editProfile() {
    
  }

}
