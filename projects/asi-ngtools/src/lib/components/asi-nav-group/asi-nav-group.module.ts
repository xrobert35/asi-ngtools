import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNav } from './asi-nav/asi-nav.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiNavGroup } from './asi-nav-group.component';

export * from './../../asi-ngtools-base.module';
export * from './asi-nav/asi-nav.component';
export * from './asi-nav-group.component';

@NgModule({
  declarations: [AsiNavGroup, AsiNav],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiNavGroup, AsiNav],
  entryComponents: [],
  providers: []
})
export class AsiNavGroupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiNavGroupModule,
      providers: []
    };
  }
}
