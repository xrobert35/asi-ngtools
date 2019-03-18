import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import {
  AsiComponentTemplateOptionDef, AsiComponentTemplateEmptyDef, AsiComponentTemplateClearDef,
  AsiComponentTemplateTagDef, AsiComponentTemplateCellDef, AsiComponentTemplateSelectedDef,
  AsiComponentTemplateColumnDef, AsiComponentTemplateTabHeaderDef, AsiComponentTemplateTableHeaderDef,
  AsiComponentTemplateTreeNodeDef, AsiComponentTemplateTreeLeafDef, AsiComponentTemplate,
  AsiComponentTemplateCollapseHeaderDef, AsiComponentTemplateNavHeaderDef
} from './components/common/asi-component-template';

export * from './components/common/default-control-value-accessor';
export * from './components/common/asi-component-template';

@NgModule({
  declarations: [
    AsiComponentTemplateTabHeaderDef,
    AsiComponentTemplateTableHeaderDef,
    AsiComponentTemplateOptionDef,
    AsiComponentTemplateEmptyDef,
    AsiComponentTemplateClearDef,
    AsiComponentTemplateSelectedDef,
    AsiComponentTemplateColumnDef,
    AsiComponentTemplateCellDef,
    AsiComponentTemplateTagDef,
    AsiComponentTemplateTreeNodeDef,
    AsiComponentTemplateTreeLeafDef,
    AsiComponentTemplateNavHeaderDef,
    AsiComponentTemplateCollapseHeaderDef,
    AsiComponentTemplate],
  imports: [TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule],
  exports: [TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AsiComponentTemplateTabHeaderDef,
    AsiComponentTemplateTableHeaderDef,
    AsiComponentTemplateOptionDef,
    AsiComponentTemplateEmptyDef,
    AsiComponentTemplateClearDef,
    AsiComponentTemplateSelectedDef,
    AsiComponentTemplateTagDef,
    AsiComponentTemplateColumnDef,
    AsiComponentTemplateCellDef,
    AsiComponentTemplateTreeNodeDef,
    AsiComponentTemplateTreeLeafDef,
    AsiComponentTemplateCollapseHeaderDef,
    AsiComponentTemplate],
  entryComponents: [],
  providers: [TranslateService]
})
export class AsiNgToolsBaseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiNgToolsBaseModule,
      providers: [TranslateService]
    };
  }
}
