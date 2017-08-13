import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the SortPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(messages: any[], sortDirection: string) {
    if (messages) {
      if (sortDirection == 'desc')
        messages = messages.sort((a, b) => {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
      else
        messages = messages.sort((a, b) => {
          return new Date(a.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
      console.log(messages);
      return messages;
    } else {
      return messages;
    }
  }
}
