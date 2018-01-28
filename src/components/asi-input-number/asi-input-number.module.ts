import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiInputNumberComponent } from './asi-input-number.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-input-number.component';

@NgModule({
  declarations: [AsiInputNumberComponent],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiInputNumberComponent],
  entryComponents: [],
  providers: []
})
export class AsiInputNumberModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiInputNumberModule,
      providers: []
    };
  }
}