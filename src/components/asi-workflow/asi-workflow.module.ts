import { AsiWorkflowGuard } from './asi-workflow-state.guard';
import { AsiFaIconModule } from './../asi-fa-icon/asi-fa-icon.module';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

import { AsiWorkflowComponent } from './asi-workflow.component';
import { asiWorkflowStateReducer } from './asi-workflow-state.reducer';

import { StoreModule } from '@ngrx/store'

export * from './asi-workflow.component';
export * from './asi-workflow-state';
export * from './asi-workflow-state-view.abstract';
export * from './asi-workflow-manager.interface';
export * from './asi-workflow-state.reducer';
export * from './asi-workflow-state.action';
export * from './asi-workflow-state.guard';
export * from './../asi-fa-icon/asi-fa-icon.module';
export * from './../../asi-ngtools-base.module';

@NgModule({
  declarations: [AsiWorkflowComponent],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiFaIconModule.forRoot(), StoreModule.forRoot({ state: asiWorkflowStateReducer })],
  exports: [AsiNgToolsBaseModule, AsiWorkflowComponent],
  entryComponents: [],
  providers: [AsiWorkflowGuard]
})
export class AsiWorkflowModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiWorkflowModule,
      providers: [AsiWorkflowGuard]
    };
  }
}