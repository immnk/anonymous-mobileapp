import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { PipesModule } from '../../pipes/pipes.module';
// import { SortPipe } from '../../pipes/sort/sort';
// import { TimeSincePipe } from '../../pipes/time-since/time-since';

@NgModule({
  declarations: [
    HomePage,
    // SortPipe,
    // TimeSincePipe
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    PipesModule.forRoot()
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule { }
