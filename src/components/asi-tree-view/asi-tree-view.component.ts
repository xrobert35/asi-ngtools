import { Component, ContentChild, Input, ViewChildren, QueryList, Output, EventEmitter, HostBinding } from '@angular/core';
import { AsiComponentTemplateTreeNodeDef, AsiComponentTemplateTreeLeafDef } from './../common/asi-component-template';
import { AsiTreeViewNodeComponent } from './node/asi-tree-view-node.component';
import * as lodash from 'lodash';
import { AsiTreeViewService } from './asi-tree-view.service';

@Component({
  selector: 'asi-tree-view',
  templateUrl: 'asi-tree-view.component.html',
})
export class AsiTreeViewComponent {

  @HostBinding('class') class = 'asi-component asi-tree-view';

  private baseData: Array<any> = [];
  filteredData: Array<any> = [];

  @Output() onNodeSelected = new EventEmitter<any>();

  @ContentChild(AsiComponentTemplateTreeNodeDef) nodeDef: AsiComponentTemplateTreeNodeDef;
  @ContentChild(AsiComponentTemplateTreeLeafDef) leafDef: AsiComponentTemplateTreeLeafDef;

  @Input()
  set data(data: Array<any>) {
    this.baseData = data;
    this.filteredData = data;
  };

  @Input() nodeName = '';

  /** If this function is define it's used to define of the node is a leaf */
  @Input() isLeaf: Function = null;

  @ViewChildren(AsiTreeViewNodeComponent) nodes: QueryList<AsiTreeViewNodeComponent>;

  constructor(private asiTreeViewService: AsiTreeViewService) {
  }

  public openNode(nodeFinder: Function) {
    this.asiTreeViewService.openNode(this.nodes.toArray(), nodeFinder);
  }

  public closeAll() {
    this.asiTreeViewService.closeAll(this.nodes.toArray());
  }

  public openAll() {
    this.asiTreeViewService.openAll(this.nodes.toArray());
  }

  filterNodes(nodeFinder: Function, keepLeaves?: boolean, isLeaf?: Function) {
    this.filteredData = this.asiTreeViewService.filterNodes(lodash.cloneDeep(this.baseData), this.nodeName, nodeFinder, keepLeaves, isLeaf);
    setTimeout(() => {
      this.openAll();
    });
  }

  public onNodeClicked(node: AsiTreeViewNodeComponent) {
    this.onNodeSelected.emit(node);
  }
}
