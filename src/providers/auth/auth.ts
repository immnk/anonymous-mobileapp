import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private _af: FirebaseApp) {
  }

  loginUser(email: string, password: string): firebase.Promise<any> {
    return this._af.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): firebase.Promise<any> {
    return this._af.auth().createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        this._af.database().ref('/userProfile').child(newUser.uid)
          .set({ email: email });
      });
  }

  resetPassword(email: string): firebase.Promise<void> {
    return this._af.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<void> {
    return this._af.auth().signOut();
  }

  isAuthenticated() {
    var user = this._af.auth().currentUser;

    if (user) {
      return user;
    } else {
      return false;
    }
  }
}
