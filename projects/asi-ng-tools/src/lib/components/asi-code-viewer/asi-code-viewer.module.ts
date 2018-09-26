import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiCodeViewer } from './asi-code-viewer.component';

export * from './../../asi-ngtools-base.module';
export * from './asi-code-viewer.component';

@NgModule({
  declarations: [AsiCodeViewer],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiCodeViewer],
  entryComponents: [],
  providers: []
})
export class AsiCodeViewerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiCodeViewerModule,
      providers: []
    };
  }
}
