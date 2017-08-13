import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TimeSincePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'timeSince',
})
export class TimeSincePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    var DURATION_IN_SECONDS = {
      epochs: ['year', 'month', 'day', 'hour', 'minute', 'second'],
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    }

    var epoch, interval, duration, returnValue;
    var seconds = Math.floor((new Date().getTime() - new Date(value).getTime()) / 1000);

    if (seconds > 0) {
      for (var i = 0; i < DURATION_IN_SECONDS.epochs.length; i++) {
        epoch = DURATION_IN_SECONDS.epochs[i];
        interval = Math.floor(seconds / DURATION_IN_SECONDS[epoch]);
        if (interval >= 1) {
          duration = {
            interval: interval,
            epoch: epoch
          };
          break;
        }
      }

      var suffix = (duration.interval > 1 || duration.interval === 0) ? 's' : '';
      returnValue = duration.interval + ' ' + duration.epoch + suffix + " ago";
    } else {
      returnValue = "just now";
    }
    return returnValue;
  }

}
