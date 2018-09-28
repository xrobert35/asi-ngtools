import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiTreeViewComponent } from './asi-tree-view.component';
import { AsiTreeViewNodeComponent } from './node/asi-tree-view-node.component';
import { AsiTreeViewService } from './asi-tree-view.service';

export * from './../../asi-ngtools-base.module';
export * from './asi-tree-view.component';
export * from './asi-tree-view.service';
export * from './node/asi-tree-view-node.component';

@NgModule({
  declarations: [AsiTreeViewComponent, AsiTreeViewNodeComponent],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiTreeViewComponent],
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
