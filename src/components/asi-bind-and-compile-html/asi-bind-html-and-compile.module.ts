import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiFileService } from './../../services/asi-file.service';
import { DynamicComponentModule } from 'ng-dynamic';
import { AsiBindAndCompileHtml } from './asi-bind-and-compile-html.component';

export * from './../../asi-ngtools-base.module';
export * from './../../services/asi-file.service';
export * from './asi-bind-and-compile-html.component';

@NgModule({
  declarations: [AsiBindAndCompileHtml],
  imports: [AsiNgToolsBaseModule.forRoot(), DynamicComponentModule],
  exports: [AsiNgToolsBaseModule, AsiBindAndCompileHtml, DynamicComponentModule],
  entryComponents: [],
  providers: [AsiFileService]
})
export class AsiBindAndCompileHtmlModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiBindAndCompileHtmlModule,
      providers: [AsiFileService]
    };
  }
}