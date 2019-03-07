import { ModuleWithProviders, NgModule } from '@angular/core';

import { AsiNgToolsBaseModule } from '../../asi-ngtools-base.module';
import { AsiDropdownModule } from '../asi-dropdown/asi-dropdown.module';
import { AsiFaIconModule } from '../asi-fa-icon/asi-fa-icon.module';
import { AsiInputModule } from '../asi-input/asi-input.module';
import { AsiTreeViewModule } from '../asi-tree-view/asi-tree-view.module';
import { AsiTreeSelectComponent } from './asi-tree-select.component';

export * from '../../asi-ngtools-base.module';
export * from '../asi-dropdown/asi-dropdown.module';
export * from '../asi-fa-icon/asi-fa-icon.module';
export * from '../asi-input/asi-input.module';
export * from '../asi-tree-view/asi-tree-view.module';
export * from './asi-tree-select.component';

@NgModule({
  declarations: [
    AsiTreeSelectComponent
  ],
  imports: [
    AsiNgToolsBaseModule.forRoot(),
    AsiDropdownModule.forRoot(),
    AsiFaIconModule.forRoot(),
    AsiInputModule.forRoot(),
    AsiTreeViewModule.forRoot()
  ],
  providers: [],
  exports: [
    AsiNgToolsBaseModule,
    AsiDropdownModule,
    AsiFaIconModule,
    AsiInputModule,
    AsiTreeViewModule,
    AsiTreeSelectComponent
  ]
})
export class AsiTreeSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiTreeSelectModule,
      providers: []
    }
  }
}
