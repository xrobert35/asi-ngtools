import {
  Component, TemplateRef, Input, ElementRef, OnInit, Renderer2,
  ViewChild, ViewChildren, QueryList, HostBinding
} from '@angular/core';
import { AsiComponentTemplateTreeNodeDef, AsiComponentTemplateTreeLeafDef } from './../../common/asi-component-template';
import { AsiTreeViewComponent } from './../asi-tree-view.component';

import * as nh from '../../../native-helper';

@Component({
  selector: 'asi-tree-view-node',
  host: { 'class': 'asi-component asi-tree-view-node' },
  templateUrl: 'asi-tree-view-node.component.html'
})
export class AsiTreeViewNodeComponent implements OnInit {

  @HostBinding('class.found') found = false;

  @Input() level: number;

  data: any;
  @Input() set nodeData(nodeData: any) {
    this.data = nodeData;
    if (this.init) {
      this.onDataChange();
    }
  };

  @Input() nodeName: string;
  @Input() nodeDef: AsiComponentTemplateTreeNodeDef;
  @Input() leafDef: AsiComponentTemplateTreeLeafDef;
  @Input() asiTreeView: AsiTreeViewComponent;
  @Input() isLeaf: Function = null;
  @Input() firstNode: boolean;
  @Input() lastNode: boolean;

  @ViewChild('treeNode') treeNode: ElementRef;
  @ViewChildren(AsiTreeViewNodeComponent) public childNodes: QueryList<AsiTreeViewNodeComponent>;

  template: TemplateRef<any>;
  public leaf = false;
  subData: any = null;
  init = false;

  open = false

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.onDataChange();
    this.init = true;
  }

  onDataChange() {
    this.subData = nh.get(this.data, this.nodeName);

    let leafTemplate = (this.isLeaf && this.isLeaf(this.data)) || (!this.isLeaf && !this.subData);

    if (leafTemplate) {
      this.template = this.leafDef.template;
      this.renderer.addClass(this.treeNode.nativeElement, 'leaf');
    } else {
      this.template = this.nodeDef.template;
      this.renderer.addClass(this.treeNode.nativeElement, 'node');
    }

    this.elementRef.nativeElement.style.marginLeft = ((this.level - 1) * 10) + 'px';
  }

  public tagFound(found: true) {
    this.found = found;
  }

  /** Open the node if it is not a leaf */
  public openNode() {
    if (!this.leaf) {
      this.open = true;
    }
  }

  /**
   * Close the node
   */
  public closeNode() {
    this.open = false;
  }

  /**
   * Toggle open/clode node
   */
  public toggleNode() {
    if (this.open) {
      this.open = false;
    } else {
      this.openNode();
    }
  }

  public refresh() {
    this.onDataChange();
  }

  onNodeCliked() {
    this.asiTreeView.onNodeClicked(this);
    this.toggleNode();
  }
}
