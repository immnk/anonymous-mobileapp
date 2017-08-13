import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private db: AngularFireDatabase, private _logger: LoggerServiceProvider) {

  }

  getObjectData(key: string, _query: object = {}): Promise<any> {

    let promise = new Promise((resolve, reject) => {
      this.db.object(key, _query)
        .subscribe((data) => {
          resolve(data);
        })
    });

    return promise;
  }

  updateData(key: string, data: object, force: boolean): firebase.Promise<any> {
    const itemObservable = this.db.object(key);
    let promise;

    if (force) {
      promise = itemObservable.set(data);
    } else {
      itemObservable.update(data);
    }

    return promise;
  }

  removeData(key: string): firebase.Promise<any> {
    return this.db.object(key).remove();
  }

  addDataToList(key: string, data: object): firebase.database.ThenableReference {
    const items = this.db.list(key);
    return items.push(data);
  }

  getListData(key: string, _query: object = {}): Promise<any> {
    this._logger.log("DatabaseProvider: getListData - start");
    this._logger.log("DatabaseProvider: getListData - inputs", key, _query);

    let promise = new Promise((resolve, reject) => {
      this.db.list(key, _query)
        .subscribe((data) => {
          resolve(data);
        });
    });

    this._logger.log("DatabaseProvider: getListData - end");
    return promise;
  }

  getAsyncListData(key: string,_query: object = {}): FirebaseListObservable<any> {
    return this.db.list(key, _query);
  }
}
