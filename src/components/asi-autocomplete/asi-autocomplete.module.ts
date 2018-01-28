import { ModuleWithProviders, NgModule } from '@angular/core';

import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

import { AsiDropdownModule } from './../asi-dropdown/asi-dropdown.module';

import { AsiAutoCompleteComponent } from './simple/asi-autocomplete.component';
import { AsiAutoCompleteMultipleComponent } from './multiple/asi-autocomplete-multiple.component';

export * from './../../asi-ngtools-base.module';
export * from './simple/asi-autocomplete.component';
export * from './multiple/asi-autocomplete-multiple.component';

@NgModule({
  declarations: [AsiAutoCompleteComponent, AsiAutoCompleteMultipleComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiDropdownModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiAutoCompleteComponent, AsiAutoCompleteMultipleComponent],
  entryComponents: [],
  providers: []
})
export class AsiAutoCompleteModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiAutoCompleteModule,
      providers: []
    };
  }
}