import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiCheckboxComponent } from './asi-checkbox.component';

export * from './../../asi-ngtools-base.module';
export * from './asi-checkbox.component';

@NgModule({
  declarations: [AsiCheckboxComponent],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiCheckboxComponent],
  entryComponents: [],
  providers: []
})
export class AsiCheckBoxModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiCheckBoxModule,
      providers: []
    };
  }
}