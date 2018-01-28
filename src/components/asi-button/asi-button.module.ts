import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiButtonComponent } from './asi-button.component';
import { AsiLinkButtonComponent } from './asi-link-button.component';

export * from './../../asi-ngtools-base.module';
export * from './asi-button.component';
export * from './asi-link-button.component';

@NgModule({
  declarations: [AsiButtonComponent, AsiLinkButtonComponent],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiButtonComponent, AsiLinkButtonComponent],
  entryComponents: [],
  providers: []
})
export class AsiButtonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiButtonModule,
      providers: []
    };
  }
}