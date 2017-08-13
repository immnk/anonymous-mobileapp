import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';
import { AuthProvider } from '../../providers/auth/auth';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UsersProvider {

  private users: Array<any>;
  constructor(public db: DatabaseProvider, private _logger: LoggerServiceProvider, private auth: AuthProvider) {
    this._logger.log('Hello UsersProvider Provider');
    this.users = [];
  }

  getAllUsers(): Promise<any> {

    let promise = new Promise((resolve, reject) => {
      let user = this.auth.isAuthenticated();
      let userEmail = user["email"];
      this.db.getObjectData('/userProfile')
        .then((data) => {
          let users = [];
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              data[key]["key"] = key;
              if (userEmail != data[key]["email"])
                users.push(data[key]);
            }
          }

          this.users = users;
          resolve(this.users);
        })
        .catch((err) => {
          reject(err);
        })
    })

    return promise;
  }

  getUsers() {
    return this.users;
  }

}
