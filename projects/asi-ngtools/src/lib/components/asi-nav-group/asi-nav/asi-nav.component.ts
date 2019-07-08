import { Input, Component, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { AsiComponentTemplateTabHeaderDef } from '../../common/asi-component-template';

@Component({
  selector: 'asi-nav',
  template: '<ng-template><ng-content></ng-content></ng-template>',
})
export class AsiNav {

  @Input() label: string;
  @Input() routerLink: string;

  @ViewChild(TemplateRef, {static: false}) contentTemplate: TemplateRef<any>;

  @ContentChild(AsiComponentTemplateTabHeaderDef, {static: false}) headerDef: AsiComponentTemplateTabHeaderDef;

  public active: boolean;
  public index: Number;
}
