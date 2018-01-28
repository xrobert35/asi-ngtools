import { AsiTableInliner } from './asi-table-inliner.directive';
import { Directive, Input, ContentChild, EventEmitter, Output, ContentChildren, QueryList } from '@angular/core';
import { AsiComponentTemplateTableHeaderDef, AsiComponentTemplateCellDef } from '../common/asi-component-template';

@Directive({
  selector: 'asi-table-column',
})
export class AsiTableColumn {

  @Input() name: string;
  @Input() sortName: string;
  @Input() libelle: string;
  @Input() showIf: boolean;
  @Input() hideIf: boolean;
  @Input() inversSort: boolean = false;
  @Input() sortable: boolean = false;
  @Input() sortByDefault: boolean;
  @Input() columnClass: any;

  @Input() inlineColumn: boolean = false;

  @Input() type: 'text' | 'checkbox' = 'text';

  @Output() onChecked = new EventEmitter<any>();
  @Output() onAllChecked = new EventEmitter<boolean>();

  asc: boolean = null;

  @ContentChild(AsiComponentTemplateCellDef) cellDef: AsiComponentTemplateCellDef;
  @ContentChild(AsiComponentTemplateTableHeaderDef) headerDef: AsiComponentTemplateTableHeaderDef;

  @ContentChildren(AsiTableInliner) queryColumns: QueryList<AsiTableInliner>;
  inliners: Array<AsiTableInliner> = new Array<AsiTableInliner>();

  constructor() {
    this.asc = this.sortByDefault;
  }

  // asc / desc / not sort
  toggleSort(): boolean {
    return this.asc = !this.asc;
  }

  unsort() {
    this.asc = null;
  }

  getAsc() {
    return this.inversSort ? !this.asc : this.asc;
  }

  getSortName() {
    return this.sortName != null ? this.sortName : this.name;
  }

  ngAfterContentInit() {
    this.queryColumns.forEach(inlined => {
      this.inliners.push(inlined)
    });
  }
}