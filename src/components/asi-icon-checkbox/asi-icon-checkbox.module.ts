import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiIconCheckboxComponent } from './asi-icon-checkbox.component';
import { AsiFaIconModule } from './../asi-fa-icon/asi-fa-icon.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-icon-checkbox.component';

@NgModule({
  declarations: [AsiIconCheckboxComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiFaIconModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiIconCheckboxComponent],
  entryComponents: [],
  providers: []
})
export class AsiIconCheckBoxModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiIconCheckBoxModule,
      providers: []
    };
  }
}