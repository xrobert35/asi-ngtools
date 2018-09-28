import { AsiFaIconModule } from './../asi-fa-icon/asi-fa-icon.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiInputIconComponent } from './asi-input-icon.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiButtonModule } from './../asi-button/asi-button.module';

export * from './../asi-fa-icon/asi-fa-icon.module';
export * from './../../asi-ngtools-base.module';
export * from './asi-input-icon.component';

@NgModule({
  declarations: [AsiInputIconComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiFaIconModule.forRoot(), AsiButtonModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiInputIconComponent, AsiFaIconModule, AsiButtonModule],
  entryComponents: [],
  providers: []
})
export class AsiInputIconModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiInputIconModule,
      providers: []
    };
  }
}
