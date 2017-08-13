import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';
import { FirebaseListObservable } from 'angularfire2/database';

/*
  Generated class for the MessagingServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MessagingServiceProvider {

  constructor(public db: DatabaseProvider, private _logger: LoggerServiceProvider, private auth: AuthProvider) {
    this._logger.log("Hello MessagingServiceProvider");
  }

  sendMessage(messageObj): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.db.addDataToList("/messages", messageObj)
        .then((response) => {
          this._logger.log("Data written to database", response);
          resolve(response);
        }).catch((err) => {
          this._logger.error("Error in writing", err);
          reject(err);
        })

    });

    return promise;
  }

  getAllReceivedMessagesInAsync(): FirebaseListObservable<any> {
    let returnRef: FirebaseListObservable<any>;
    let user = this.auth.isAuthenticated();
    if (user) {
      let query = {
        query: {
          orderByChild: 'receiver_key',
          equalTo: user["uid"]
        }
      }
      returnRef = this.db.getAsyncListData("/messages", query);
    }

    return returnRef;
  }

  getAllSentMessagesInAsync(): FirebaseListObservable<any[]> {
    let returnRef: FirebaseListObservable<any>;
    let user = this.auth.isAuthenticated();
    if (user) {
      let query = {
        query: {
          orderByChild: 'sender_key',
          equalTo: user["uid"]
        }
      }
      returnRef = this.db.getAsyncListData("/messages", query);
    }

    return returnRef;
  }

  getAllReceivedMessages(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let user = this.auth.isAuthenticated();
      if (user) {
        let query = {
          query: {
            orderByChild: 'receiver_email',
            equalTo: user["email"]
          }
        }
        this.db.getListData("/messages", query)
          .then((response) => {
            resolve(response)
          })
          .catch(err => reject(err));
      } else {
        reject("User is not yet authenticated");
      }
    });

    return promise;
  }

  getAllSentMessages(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let user = this.auth.isAuthenticated();
      if (user) {
        let query = {
          query: {
            orderByChild: 'sender_key',
            equalTo: user["uid"]
          }
        }
        this.db.getListData("/messages", query)
          .then((response) => {
            resolve(response)
          })
          .catch(err => reject(err));
      } else {
        reject("User is not yet authenticated");
      }
    });

    return promise;
  }

}
