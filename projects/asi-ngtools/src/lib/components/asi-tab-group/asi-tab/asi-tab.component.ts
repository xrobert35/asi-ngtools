import { Input, Component, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { AsiComponentTemplateTabHeaderDef } from '../../common/asi-component-template';

@Component({
  selector: 'asi-tab',
  template: '<ng-template><ng-content></ng-content></ng-template>',
})
export class AsiTab {

  /** Give an id to the tab  */
  @Input() tabId: string;

  /** Label to display (is translated) */
  @Input() label: string;

  /** Add a custom class to the tab */
  @Input() tabClass: string;

  @ViewChild(TemplateRef, {static: true}) contentTemplate: TemplateRef<any>;

  @ContentChild(AsiComponentTemplateTabHeaderDef, {static: false}) headerDef: AsiComponentTemplateTabHeaderDef;

  public active: boolean;
  public index: Number;
}
