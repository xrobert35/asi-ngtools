import { AsiDropDown } from './asi-dropdown.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiDropdownContainer } from './container/asi-dropdown-container.component';
import { AsiDropdownService } from './asi-dropdown.service';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-dropdown.service';
export * from './container/asi-dropdown-container.component';
export * from './asi-dropdown.component';
export * from './../common/component-type';

@NgModule({
  declarations: [AsiDropdownContainer, AsiDropDown],
  imports: [AsiNgToolsBaseModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiDropDown],
  entryComponents: [AsiDropdownContainer],
  providers: [AsiDropdownService]
})
export class AsiDropdownModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiDropdownModule,
      providers: [AsiDropdownService]
    };
  }
}
