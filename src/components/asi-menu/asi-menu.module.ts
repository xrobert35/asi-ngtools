import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiMenuItem } from './asi-menu-item.component';
import { AsiMenu } from './asi-menu.component';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-menu-item.component';
export * from './asi-menu.component';

@NgModule({
  declarations: [AsiMenu, AsiMenuItem],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiMenu, AsiMenuItem],
  entryComponents: [],
  providers: []
})
export class AsiMenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiMenuModule,
      providers: []
    };
  }
}