import { AsiDropdownModule } from './../asi-dropdown/asi-dropdown.module';
import { AsiDirectivesModule } from './../../directives/asi-directives.module';
import { AsiFaIconModule } from './../asi-fa-icon/asi-fa-icon.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiSelectModule } from './../asi-select/asi-select.module';
import { AsiCalendarComponent } from './asi-calendar.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from '../../directives/asi-directives.module';
export * from '../asi-select/asi-select.module';
export * from '../asi-fa-icon/asi-fa-icon.module';
export * from './asi-calendar.component';

@NgModule({
  declarations: [AsiCalendarComponent],
  imports: [AsiNgToolsBaseModule, AsiDirectivesModule.forRoot(), AsiSelectModule.forRoot(), AsiFaIconModule.forRoot(),  AsiDropdownModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiCalendarComponent],
  entryComponents: [],
  providers: []
})
export class AsiCalendarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiCalendarModule,
      providers: []
    };
  }
}