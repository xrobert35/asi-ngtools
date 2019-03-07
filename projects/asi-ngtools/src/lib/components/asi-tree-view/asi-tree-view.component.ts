import { Component, ContentChild, Input, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { AsiComponentTemplateTreeNodeDef, AsiComponentTemplateTreeLeafDef } from './../common/asi-component-template';
import { AsiTreeViewNodeComponent } from './node/asi-tree-view-node.component';
import * as nh from '../../native-helper';
import { AsiTreeViewService } from './asi-tree-view.service';

@Component({
  selector: 'asi-tree-view',
  host: { 'class': 'asi-component asi-tree-view' },
  templateUrl: 'asi-tree-view.component.html',
})
export class AsiTreeViewComponent {

  private baseData: Array<any> = [];
  filteredData: Array<any> = [];

  @ContentChild(AsiComponentTemplateTreeNodeDef) nodeDef: AsiComponentTemplateTreeNodeDef;
  @ContentChild(AsiComponentTemplateTreeLeafDef) leafDef: AsiComponentTemplateTreeLeafDef;

  /** Open icon (fontawesome) */
  @Input() iconOpen = 'fas fa-chevron-down';
  /** Close icon (fontawesome) */
  @Input() iconClose = 'fas fa-chevron-up';

  /** List of data to display */
  @Input()
  set data(data: Array<any>) {
    this.baseData = data;
    this.filteredData = data;
  };

  /** define the name of the sub nodes to display  */
  @Input() nodeName = '';

  /** If this function is define it's used to define if the node is a leaf */
  @Input() isLeaf: Function = null;

  /** Event emitted when a node is selected */
  @Output() onNodeSelected = new EventEmitter<any>();

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
    this.filteredData = this.asiTreeViewService.filterNodes(nh.cloneDeep(this.baseData), this.nodeName, nodeFinder, keepLeaves, isLeaf);
    setTimeout(() => {
      this.openAll();
    });
  }

  public onNodeClicked(node: AsiTreeViewNodeComponent) {
    this.onNodeSelected.emit(node);
  }
}
