import { Component, Input, ViewChild, OnInit, Renderer2, ElementRef, forwardRef, ContentChild } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  AsiComponentTemplateTreeLeafDef,
  AsiComponentTemplateTreeNodeDef,
  AsiComponentTemplateClearDef
} from '../common/asi-component-template';
import { AsiTreeViewComponent } from '../asi-tree-view/asi-tree-view.component';
import { AsiTreeViewNodeComponent } from '../asi-tree-view/node/asi-tree-view-node.component';
import { DefaultControlValueAccessor } from '../common/default-control-value-accessor';
import * as nh from '../../native-helper';

@Component({
  selector: 'asi-tree-select',
  templateUrl: 'asi-tree-select.component.html',
  host: { 'class': 'asi-component asi-tree-select' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiTreeSelectComponent),
      multi: true
    }
  ]
})
export class AsiTreeSelectComponent extends DefaultControlValueAccessor implements OnInit {

  /** html id */
  @Input() id: string;

  /** html name */
  @Input() name: string;

  /** Label to display (is translated) */
  @Input() label: string;

  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  /** Placeholder */
  @Input() placeholder: string;

  /** Select data */
  @Input() data: any[];

  /** Field containing the label of the item to display */
  @Input() labelField = 'label';

  /** Field containing the children of an item */
  @Input() childrenField = 'children';

  /** Allow selection of nodes which have children */
  @Input() allowParentSelection = false;

  /** Functions used to decide if an item should be displayed when a filter is applied (returns a boolean) */
  @Input() filter: (item: any, filter: string) => boolean;

  /** Display a clear button */
  @Input() clearButton = false;

  @ViewChild('selectHeader', {static: true}) selectHeaderContainer: ElementRef;
  @ViewChild(AsiTreeViewComponent, {static: false}) asiTreeView: AsiTreeViewComponent;

  @ContentChild(AsiComponentTemplateClearDef, {static: false}) clearDef: AsiComponentTemplateClearDef;
  @ContentChild(AsiComponentTemplateTreeNodeDef, {static: false}) nodeDef: AsiComponentTemplateTreeNodeDef;
  @ContentChild(AsiComponentTemplateTreeLeafDef, {static: false}) leafDef: AsiComponentTemplateTreeLeafDef;

  formControl = new FormControl();
  dropdownOpened = false;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { super(); }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
  }

  isLeaf = (item: any) => {
    return item && nh.isEmpty(item[this.childrenField]);
  };

  onNodeSelected(node: AsiTreeViewNodeComponent) {
    const item = node.data;
    if (this.isLeaf(item) || this.allowParentSelection) {
      this.asiTreeView.filterNodes(() => true);
      this.dropdownOpened = false;

      if (item && item[this.labelField]) {
        this.value = item;
        this.formControl.setValue(item[this.labelField], { emitEvent: false });
      } else {
        this.value = null;
        this.formControl.setValue(null, { emitEvent: false });
      }
    }
  }

  onFilter(filter: string) {
    if (filter) {
      if (this.filter) {
        this.asiTreeView.filterNodes((item: any) => {
          return this.filter && this.filter(item, filter);
        });
      }
    } else {
      this.asiTreeView.filterNodes(() => true);
    }
  }

  toggleDropdown() {
    this.dropdownOpened = !this.disabled && !this.dropdownOpened;
  }

  onDropdownClosed() {
    this.dropdownOpened = false;
  }

  clear() {
    this.dropdownOpened = false;
    this.value = null;
    this.formControl.reset();
  }

  displayClearButton(): boolean {
    return this.clearButton && this.value;
  }

  // override DefaultControlValueAccessor#writeValue
  writeValue(value: any): void {
    this._value = value;
    if (this.value && this.value[this.labelField]) {
      this.formControl.setValue(this.value[this.labelField], { emitEvent: false });
    } else {
      this.formControl.reset();
    }
  }

}
