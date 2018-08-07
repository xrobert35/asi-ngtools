import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiDialogService } from './asi-dialog.service';
import { AsiDialog } from './dialog/asi-dialog.component';
import { AsiDialogContainer } from './container/asi-dialog-container.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-dialog.service';
export * from './dialog/asi-dialog.component';
export * from  './container/asi-dialog-container.component';
export * from './asi-dialog-config';
export * from './asi-dialog-view';
export * from './../common/component-type';


@NgModule({
  declarations: [AsiDialogContainer, AsiDialog],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule],
  entryComponents: [AsiDialogContainer, AsiDialog],
  providers: [AsiDialogService]
})
export class AsiDialogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiDialogModule,
      providers: [AsiDialogService]
    };
  }
}
