import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiSwitchComponent } from './asi-switch.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-switch.component';

@NgModule({
  declarations: [AsiSwitchComponent],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiSwitchComponent],
  entryComponents: [],
  providers: []
})
export class AsiSwitchModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiSwitchModule,
      providers: []
    };
  }
}
