import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiCollapseComponent } from './asi-collapse.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-collapse.component';

@NgModule({
  declarations: [AsiCollapseComponent],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiCollapseComponent],
  entryComponents: [],
  providers: []
})
export class AsiCollapseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiCollapseModule,
      providers: []
    };
  }
}