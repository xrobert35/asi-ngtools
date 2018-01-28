import { Input, Component, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { AsiComponentTemplateTabHeaderDef } from '../../common/asi-component-template';

@Component({
  selector: 'asi-tab',
  template: '<ng-template><ng-content></ng-content></ng-template>',
})
export class AsiTab {

  @Input() label : string;

  @ViewChild(TemplateRef) contentTemplate: TemplateRef<any>;

  @ContentChild(AsiComponentTemplateTabHeaderDef) headerDef: AsiComponentTemplateTabHeaderDef;

  //Position du Tab
  public active : boolean;
  public index : Number;
}