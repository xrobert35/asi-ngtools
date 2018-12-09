import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiFaIconModule } from './../asi-fa-icon/asi-fa-icon.module';
import { AsiFileService } from './../../services/asi-file.service';
import { AsiImageChooserComponent } from './asi-image-chooser.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './../asi-fa-icon/asi-fa-icon.module';
export * from './../../services/asi-file.service';
export * from './asi-image-chooser.component';

@NgModule({
  declarations: [AsiImageChooserComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiFaIconModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiImageChooserComponent],
  entryComponents: [],
  providers: [AsiFileService]
})
export class AsiImageChooserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiImageChooserModule,
      providers: [AsiFileService]
    };
  }
}
