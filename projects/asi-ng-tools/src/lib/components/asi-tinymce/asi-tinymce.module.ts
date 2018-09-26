import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiTinyMCE } from './asi-tinymce.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export *  from './asi-tinymce.component';

@NgModule({
  declarations: [AsiTinyMCE],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiTinyMCE],
  entryComponents: [],
  providers: []
})
export class AsiTinyMCEModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiTinyMCEModule,
      providers: []
    };
  }
}
