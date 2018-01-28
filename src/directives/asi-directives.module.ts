import { ModuleWithProviders, NgModule } from '@angular/core';
import { MouseWheelDirective } from './mouseWheel.directive';
import { NoDblclickPropagration } from './no-dblclick-propagation.directive';
import { NoClickPropagration } from './no-click-propagation.directive';
import { FocusDirective } from './focus.directive';

export * from './mouseWheel.directive';
export * from './no-dblclick-propagation.directive';
export * from './no-click-propagation.directive';
export * from './focus.directive';

@NgModule({
  declarations: [FocusDirective,
    NoClickPropagration,
    NoDblclickPropagration,
    MouseWheelDirective],
  imports: [],
  exports: [FocusDirective,
    NoClickPropagration,
    NoDblclickPropagration,
    MouseWheelDirective],
  entryComponents: [],
  providers: []
})
export class AsiDirectivesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiDirectivesModule,
      providers: []
    };
  }
}