import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  messagesRoot = 'HomePage';
  searchRoot = 'SearchPage';
  aboutRoot = 'AboutPage';

  constructor() {

  }
}
