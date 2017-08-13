import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MessagingServiceProvider } from '../../providers/messaging-service/messaging-service';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  viewMessageType: string;
  messagesReceived: Array<any>;
  messagesSent: Array<any>;
  messagesReceivedAsync: any;
  messagesSentAsync: any;
  constructor(public navCtrl: NavController, private messagingService: MessagingServiceProvider,
    private _logger: LoggerServiceProvider) {
    this.initializeApp();
  }

  initializeApp() {
    this.viewMessageType = "received";

    this.getReceivedMessages();
    this.getSentMessages();
  }

  doRefresh(refresher) {
    refresher.complete();
    this.getReceivedMessages();
    this.getSentMessages();
  }

  getReceivedMessages(refresher?) {
    this.messagesReceivedAsync = this.messagingService.getAllReceivedMessagesInAsync();
    if (refresher)
      refresher.complete();

    // this.messagesReceived = [];
    // this.messagingService.getAllReceivedMessages()
    //   .then((response) => {
    //     this._logger.log("Received Messages", response);
    //     this.messagesReceived = response;
    //     if (refresher)
    //       refresher.complete();
    //   })
    //   .catch((err) => {
    //     this._logger.error(err);
    //     if (refresher)
    //       refresher.complete();
    //   });
  }

  getSentMessages(refresher?) {
    this.messagesSentAsync = this.messagingService.getAllSentMessagesInAsync();
    if (refresher)
      refresher.complete();

    // this.messagesSent = [];
    // this.messagingService.getAllSentMessages()
    //   .then((response) => {
    //     this._logger.log("Sent Messages", response);
    //     this.messagesSent = response;
    //     if (refresher)
    //       refresher.complete();
    //   })
    //   .catch((err) => {
    //     this._logger.error(err);
    //     if (refresher)
    //       refresher.complete();
    //   });
  }

}
