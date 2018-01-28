import { AsiDmyPickerComponent } from './asi-dmypicker.component';
import { AsiSelectModule } from './../asi-select/asi-select.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from '../asi-select/asi-select.module';
export * from './asi-dmypicker.component';

@NgModule({
  declarations: [AsiDmyPickerComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiSelectModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiDmyPickerComponent],
  entryComponents: [],
  providers: []
})
export class AsiDmyPickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiDmyPickerModule,
      providers: []
    };
  }
}