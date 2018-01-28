import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiCheckBoxModule } from './../asi-checkbox/asi-checkbox.module';
import { AsiRadioElement } from './asi-radio-element/asi-radio-element.component';
import { AsiRadioGroupComponent } from './asi-radio-group.component';
import { AsiRadioComponent } from './asi-radio/asi-radio.component';

export * from './../../asi-ngtools-base.module';
export * from './../asi-checkbox/asi-checkbox.module';

export * from './asi-radio/asi-radio.component';
export * from './asi-radio-group.component';
export * from './asi-radio-element/asi-radio-element.component';

@NgModule({
  declarations: [AsiRadioComponent, AsiRadioGroupComponent, AsiRadioElement],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiCheckBoxModule.forRoot()],
  exports: [AsiNgToolsBaseModule,AsiRadioComponent, AsiRadioGroupComponent, AsiRadioElement],
  entryComponents: [],
  providers: []
})
export class AsiRadioGroupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiRadioGroupModule,
      providers: []
    };
  }
}