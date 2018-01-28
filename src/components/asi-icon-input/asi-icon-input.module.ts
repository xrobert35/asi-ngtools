import { AsiFaIconModule } from './../asi-fa-icon/asi-fa-icon.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiIconInputComponent } from './asi-icon-input.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../asi-fa-icon/asi-fa-icon.module';
export * from './../../asi-ngtools-base.module';
export * from './asi-icon-input.component';

@NgModule({
  declarations: [AsiIconInputComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiFaIconModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiIconInputComponent, AsiFaIconModule],
  entryComponents: [],
  providers: []
})
export class AsiIconInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiIconInputModule,
      providers: []
    };
  }
}