import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiInputComponent } from './asi-input.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-input.component';
@NgModule({
  declarations: [AsiInputComponent],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiInputComponent],
  entryComponents: [],
  providers: []
})
export class AsiInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiInputModule,
      providers: []
    };
  }
}