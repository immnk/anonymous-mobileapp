import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private users: Array<any>;

  constructor(public navCtrl: NavController, private usersService: UsersProvider, private _logger: LoggerServiceProvider,
    private modalCtrl: ModalController, public alertCtrl: AlertController,) {
    this.initializeApp();
  }

  ionViewDidLoad() {
    this._logger.log('ionViewDidLoad SearchPage');
  }

  initializeApp() {
    this.usersService.getAllUsers()
      .then((data) => {
        this._logger.log(data);
        this.users = data;
      })
  }

  getItems(ev: any) {
    this.users = this.usersService.getUsers();
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this.users.filter((user) => {
        return (user.email.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  composeMessage(user) {
    let modal = this.modalCtrl.create("ModalPage", { user: user });
    modal.onDidDismiss(data => {
      if(data) {
        let alert = this.alertCtrl.create({
          message: "Message sent succesfully",
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      }
    });
    modal.present();
  }

}
