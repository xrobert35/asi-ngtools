import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiInputChipsComponent } from './asi-input-chips.component';

export * from './../../asi-ngtools-base.module';
export * from './asi-input-chips.component';
@NgModule({
  declarations: [AsiInputChipsComponent],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiInputChipsComponent],
  entryComponents: [],
  providers: []
})
export class AsiInputChipsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiInputChipsModule,
      providers: []
    };
  }
}
