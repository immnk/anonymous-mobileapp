import { Injectable } from '@angular/core';

/*
  Generated class for the LoggerServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoggerServiceProvider {

  constructor() {
    console.log('Hello LoggerServiceProvider Provider');
  }

  log(...message: any[]) {
    if (message.length == 1)
      console.log(this.getCurrentTime() + " : ", message[0]);
    else
      console.log(this.getCurrentTime() + " : ", message);
  }

  error(...message: any[]) {
    if (message.length == 1)
      console.error(this.getCurrentTime() + " : ", message[0]);
    else
      console.error(this.getCurrentTime() + " : ", message);
  }

  debug(message: any) {
    console.debug(this.getCurrentTime() + " : " + JSON.stringify(message));
  }

  warning(message: any) {
    console.warn(this.getCurrentTime() + " : ", message);
  }

  getCurrentTime() {
    return new Date().toISOString().replace('T', " ").substr(0, 19);
  }

}
