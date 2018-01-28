import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiFileService } from './../../services/asi-file.service';
import { AsiBindHtml } from './asi-bind-html.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './../../services/asi-file.service';
export * from './asi-bind-html.component';

@NgModule({
  declarations: [AsiBindHtml],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiBindHtml],
  entryComponents: [],
  providers: [AsiFileService]
})
export class AsiBindHtmlModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiBindHtmlModule,
      providers: [AsiFileService]
    };
  }
}