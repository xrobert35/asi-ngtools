import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiTextareaComponent } from './asi-textarea.component';

export * from './../../asi-ngtools-base.module';
export * from './asi-textarea.component';

@NgModule({
  declarations: [AsiTextareaComponent],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiTextareaComponent],
  entryComponents: [],
  providers: []
})
export class AsiTextareaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiTextareaModule,
      providers: []
    };
  }
}
