import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiCheckBoxModule } from './../asi-checkbox/asi-checkbox.module';
import { AsiSelectComponent } from './asi-select.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiDropdownModule } from './../asi-dropdown/asi-dropdown.module';

export * from './../../asi-ngtools-base.module';
export * from './../asi-checkbox/asi-checkbox.module';
export * from './asi-select.component';

@NgModule({
  declarations: [AsiSelectComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiCheckBoxModule.forRoot(), AsiDropdownModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiSelectComponent],
  entryComponents: [],
  providers: []
})
export class AsiSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiSelectModule,
      providers: []
    };
  }
}
