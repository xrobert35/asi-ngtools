import { Directive, Input, ContentChild } from '@angular/core';
import { AsiComponentTemplateCellDef } from '../common/asi-component-template';

@Directive({
  selector: 'asi-table-inliner',
})
export class AsiTableInliner {

  @Input() colSpan: number;

  @ContentChild(AsiComponentTemplateCellDef) cellDef: AsiComponentTemplateCellDef;

}