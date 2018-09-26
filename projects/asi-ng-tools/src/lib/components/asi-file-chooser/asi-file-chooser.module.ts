import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiFaIconModule } from './../asi-fa-icon/asi-fa-icon.module';
import { AsiFileService } from './../../services/asi-file.service';
import { AsiFileChooserComponent } from './asi-file-chooser.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiButtonModule } from './../asi-button/asi-button.module';

export * from './../../asi-ngtools-base.module';
export * from './../asi-fa-icon/asi-fa-icon.module';
export * from './../../services/asi-file.service';
export * from './asi-file-chooser-constants';
export * from './asi-file-chooser.component';


@NgModule({
  declarations: [AsiFileChooserComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiFaIconModule.forRoot(), AsiButtonModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiFileChooserComponent, AsiButtonModule],
  entryComponents: [],
  providers: [AsiFileService]
})
export class AsiFileChooserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiFileChooserModule,
      providers: [AsiFileService]
    };
  }
}
