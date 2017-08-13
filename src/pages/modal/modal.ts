import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';
import { MessagingServiceProvider } from '../../providers/messaging-service/messaging-service';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  private message: string;
  private user: any;
  public loading: Loading;
  public canReply: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private _logger: LoggerServiceProvider, private messageService: MessagingServiceProvider,
    private auth: AuthProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.message = "";
    this.canReply = true;
    let user = this.navParams.get("user");
    this._logger.log("user", user);
    this.user = user;
  }

  ionViewDidLoad() {
    this._logger.log('ionViewDidLoad ModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  sendMessage() {
    this._logger.log(this.message);
    let sender = this.auth.isAuthenticated();

    if (sender) {
      let messageObj = {
        "receiver_email": this.user["email"],
        "receiver_key": this.user["key"],
        "message": this.message,
        "sender_key": this.canReply ? sender['uid'] : "",
        "timestamp": new Date().toISOString()
      }
      this._logger.log(messageObj);

      this.messageService.sendMessage(messageObj)
        .then((response) => {
          this.loading.dismiss().then(() => {
            this._logger.log("Sent the message");
            this.message = "";
            this.viewCtrl.dismiss(true);
          });
        }).catch((err) => {
          this.loading.dismiss().then(() => {
            this._logger.error("Couldnt sent the message");
            let alert = this.alertCtrl.create({
              message: "Couldn't send the message. Try again.",
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }

  }

}
