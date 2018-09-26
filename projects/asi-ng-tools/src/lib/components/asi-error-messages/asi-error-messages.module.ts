import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiErrorMessages } from './asi-error-messages.component';
import { AsiMessage } from './asi-message.directive';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-error-messages.component';
export * from './asi-message.directive';

@NgModule({
  declarations: [AsiMessage, AsiErrorMessages],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiMessage, AsiErrorMessages],
  entryComponents: [],
  providers: []
})
export class AsiErrorMessagesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiErrorMessagesModule,
      providers: []
    };
  }
}