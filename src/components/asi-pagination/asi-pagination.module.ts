import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiPaginationComponent } from './asi-pagination.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-pagination.component';

@NgModule({
  declarations: [AsiPaginationComponent],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiPaginationComponent],
  entryComponents: [],
  providers: []
})
export class AsiPaginationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiPaginationModule,
      providers: []
    };
  }
}