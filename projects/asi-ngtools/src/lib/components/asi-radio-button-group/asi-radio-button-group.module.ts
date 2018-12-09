import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiRadioButtonElement } from './asi-radio-button-element/asi-radio-button-element.component';
import { AsiRadioButtonGroupComponent } from './asi-radio-button-group.component';
import { AsiRadioButtonComponent } from './asi-radio-button/asi-radio-button.component';
import { AsiButtonModule } from '../asi-button/asi-button.module';

export * from './../../asi-ngtools-base.module';
export * from './../asi-button/asi-button.module';
export * from './asi-radio-button/asi-radio-button.component';
export * from './asi-radio-button-group.component';
export * from './asi-radio-button-element/asi-radio-button-element.component';

@NgModule({
  declarations: [AsiRadioButtonElement, AsiRadioButtonGroupComponent, AsiRadioButtonComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiButtonModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiRadioButtonElement, AsiRadioButtonGroupComponent, AsiRadioButtonComponent],
  entryComponents: [],
  providers: []
})
export class AsiRadioButtonGroupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiRadioButtonGroupModule,
      providers: []
    };
  }
}
