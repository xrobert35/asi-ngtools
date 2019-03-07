import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiTreeViewComponent } from './asi-tree-view.component';
import { AsiTreeViewNodeComponent } from './node/asi-tree-view-node.component';
import { AsiTreeViewService } from './asi-tree-view.service';
import { AsiFaIconModule } from '../asi-fa-icon/asi-fa-icon.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-tree-view.component';
export * from './asi-tree-view.service';
export * from './node/asi-tree-view-node.component';
export * from '../asi-fa-icon/asi-fa-icon.module';

@NgModule({
  declarations: [AsiTreeViewComponent, AsiTreeViewNodeComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiFaIconModule.forRoot(),],
  exports: [AsiNgToolsBaseModule, AsiTreeViewComponent, AsiFaIconModule],
  entryComponents: [],
  providers: [AsiTreeViewService]
})
export class AsiTreeViewModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiTreeViewModule,
      providers: []
    };
  }
}
