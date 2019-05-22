import { Directive, Input, ContentChild } from '@angular/core';
import { AsiComponentTemplateCellDef } from '../common/asi-component-template';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'asi-table-inliner',
})
export class AsiTableInliner {

  /** Colspan of the column */
  @Input() colSpan: number;

  @Input() columnClass: string;

  @ContentChild(AsiComponentTemplateCellDef) cellDef: AsiComponentTemplateCellDef;

}
