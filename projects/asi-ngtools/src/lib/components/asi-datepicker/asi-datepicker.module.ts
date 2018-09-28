import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiCalendarModule } from './../asi-calendar/asi-calendar.module';
import { AsiDatePickerComponent } from './asi-datepicker.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from '../asi-calendar/asi-calendar.module';
export * from './asi-datepicker.component';

@NgModule({
  declarations: [AsiDatePickerComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiCalendarModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiDatePickerComponent],
  entryComponents: [],
  providers: []
})
export class AsiDatePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiDatePickerModule,
      providers: []
    };
  }
}