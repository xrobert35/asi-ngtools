import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiFaIconComponent } from './asi-fa-icon.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-fa-icon.component';

@NgModule({
  declarations: [AsiFaIconComponent],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiFaIconComponent],
  entryComponents: [],
  providers: []
})
export class AsiFaIconModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiFaIconModule,
      providers: []
    };
  }
}