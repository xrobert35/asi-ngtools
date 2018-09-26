import { AsiInputModule } from './../asi-input/asi-input.module';
import { AsiIbanFRInputComponent } from './asi-ibanfr-input.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './../asi-input/asi-input.module';
export * from './asi-ibanfr-input.component';

@NgModule({
  declarations: [AsiIbanFRInputComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiInputModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiInputModule],
  entryComponents: [],
  providers: []
})
export class AsiIbanFRInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiIbanFRInputModule,
      providers: []
    };
  }
}