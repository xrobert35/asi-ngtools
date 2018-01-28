import { Component, TemplateRef, Input, ElementRef, Renderer2, ViewChild, ViewChildren, QueryList } from "@angular/core";
import { AsiComponentTemplateTreeNodeDef, AsiComponentTemplateTreeLeafDef } from "./../../common/asi-component-template";
import { AsiTreeViewComponent } from "./../asi-tree-view.component";
import * as lodash from 'lodash';

@Component({
  selector: 'asi-tree-view-node',
  templateUrl: 'asi-tree-view-node.component.html',
  host: { 'class': 'asi-component asi-tree-view-node' }
})
export class AsiTreeViewNodeComponent {

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

  @ViewChild("treeNode") treeNode: ElementRef;
  @ViewChildren(AsiTreeViewNodeComponent) public childNodes: QueryList<AsiTreeViewNodeComponent>;

  template: TemplateRef<any>;
  public leaf: boolean = false;
  subData: any = null;
  init: boolean = false;

  open: boolean = false

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.onDataChange();
    this.init = true;
  }

  onDataChange() {
    this.subData = lodash.get(this.data, this.nodeName);

    let leafTemplate = (this.isLeaf && this.isLeaf(this.data)) || (!this.isLeaf && !this.subData);

    if (leafTemplate) {
      this.template = this.leafDef.template;
      this.renderer.addClass(this.treeNode.nativeElement, 'leaf');
    } else {
      this.template = this.nodeDef.template;
      this.renderer.addClass(this.treeNode.nativeElement, 'node');
    }

    this.elementRef.nativeElement.style.marginLeft = ((this.level - 1) * 10) + "px";
  }

  public tagFound(found: true) {
    if (found) {
      this.renderer.addClass(this.treeNode.nativeElement, 'found');
    } else {
      this.renderer.removeClass(this.treeNode.nativeElement, 'found');
    }
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