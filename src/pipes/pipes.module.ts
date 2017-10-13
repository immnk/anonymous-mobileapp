import { NgModule } from '@angular/core';
import { SortPipe } from './../pipes/sort/sort';
import { TimeSincePipe } from './../pipes/time-since/time-since';
@NgModule({
	declarations: [SortPipe,
    TimeSincePipe],
	imports: [],
	exports: [SortPipe,
    TimeSincePipe]
})
export class PipesModule {
	static forRoot() {
      return {
          ngModule: PipesModule,
          providers: []
      };
   }
}
