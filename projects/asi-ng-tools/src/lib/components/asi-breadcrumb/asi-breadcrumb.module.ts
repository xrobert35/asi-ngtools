import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiBreadcrumbComponent } from './asi-breadcrumb.component';
import { AsiDropdownModule } from './../asi-dropdown/asi-dropdown.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-breadcrumb.component';

@NgModule({
  declarations: [AsiBreadcrumbComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiDropdownModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiBreadcrumbComponent]
})
export class AsiBreadcrumbModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiBreadcrumbModule,
      providers: []
    };
  }
}
