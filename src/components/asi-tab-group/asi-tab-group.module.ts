import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiTab } from './asi-tab/asi-tab.component';
import { AsiTabElement } from './asi-tab-content/asi-tab-element/asi-tab-element.component';
import { AsiTabContent } from './asi-tab-content/asi-tab-content.component';
import { AsiTabGroup } from './asi-tab-group.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';

export * from './asi-tab/asi-tab.component';
export * from './asi-tab-content/asi-tab-element/asi-tab-element.component';
export * from './asi-tab-content/asi-tab-content.component';
export * from './asi-tab-group.component';

@NgModule({
  declarations: [AsiTabGroup, AsiTab, AsiTabContent, AsiTabElement],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiTabGroup, AsiTab],
  entryComponents: [],
  providers: []
})
export class AsiTabGroupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiTabGroupModule,
      providers: []
    };
  }
}
