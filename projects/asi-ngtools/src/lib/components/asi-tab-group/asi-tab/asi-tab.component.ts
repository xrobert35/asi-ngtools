import { Input, Component, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { AsiComponentTemplateTabHeaderDef } from '../../common/asi-component-template';

@Component({
  selector: 'asi-tab',
  template: '<ng-template><ng-content></ng-content></ng-template>',
})
export class AsiTab {

  /** Label to display (is translated) */
  @Input() label: string;

  @ViewChild(TemplateRef) contentTemplate: TemplateRef<any>;

  @ContentChild(AsiComponentTemplateTabHeaderDef) headerDef: AsiComponentTemplateTabHeaderDef;

  public active: boolean;
  public index: Number;
}
