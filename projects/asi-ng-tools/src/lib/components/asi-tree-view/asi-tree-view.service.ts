import { Injectable } from '@angular/core';
import { AsiTreeViewNodeComponent } from './node/asi-tree-view-node.component';
import * as nh from '../../native-helper';

@Injectable()
export class AsiTreeViewService {

  /**
   * Function used to open a particular node
   * @param nodeFinder
   */
  public openNode(nodes: Array<AsiTreeViewNodeComponent>, nodeFinder: Function) {
    nh.forEach(nodes, (node: AsiTreeViewNodeComponent) => {
      if (this.mustOpenNode(node, nodeFinder)) {
        node.openNode();
      }
    });
  }

  private mustOpenNode(node: AsiTreeViewNodeComponent, nodeFinder: Function) {
    if (node != null) {
      if (nodeFinder(node.data)) {
        node.openNode();
        node.tagFound(true);
        return true;
      } else if (node.childNodes) {
        let childNodes = node.childNodes.toArray();
        let openNode = false;
        for (let childNode of childNodes) {
          if (this.mustOpenNode(childNode, nodeFinder)) {
            childNode.openNode();
            openNode = true;
          }
        }
        return openNode;
      }
    }
    return false;
  }

  public closeAll(nodes: Array<AsiTreeViewNodeComponent>) {
    nh.forEach(nodes, (node: AsiTreeViewNodeComponent) => {
      this.closeNode(node);
    });
  }

  private closeNode(node: AsiTreeViewNodeComponent) {
    if (node) {
      node.closeNode();
      if (node.childNodes) {
        node.childNodes.forEach(childNode => {
          childNode.closeNode();
        });
      }
    }
  }

  public openAll(nodes: Array<AsiTreeViewNodeComponent>) {
    nh.forEach(nodes, (node: AsiTreeViewNodeComponent) => {
      this.openANode(node);
    });
  }

  private openANode(node: AsiTreeViewNodeComponent) {
    if (node) {
      node.openNode();
      if (node.childNodes) {
        node.childNodes.forEach(childNode => {
          childNode.openNode();
        });
      }
    }
  }


  /**
   * Function used to filter the tree-view
   * @param nodeFinder function used to know if the node must be keep
   * @param keepLeaves true if you want to keep the possible leafs of a matching node
   */
  public filterNodes(nodes: Array<any>, nodeName: string, nodeFinder: Function, keepLeaves?: boolean, isLeaf?: Function): Array<any> {
    nh.remove(nodes, (nodeData) => {
      return this.shouldRemoveData(nodeData, nodeName, nodeFinder, keepLeaves, isLeaf);
    });
    return nodes;
  }

  private shouldRemoveData(nodeData: any, nodeName: string, nodeFinder: Function, keepLeaves?: boolean, isLeaf?: Function) {
    let childNodes: Array<any> = <Array<any>>nh.get(nodeData, nodeName);
    let matchingLeaf = false;
    if (childNodes) {
      // Delete not matching children
      if (keepLeaves) {
        nh.remove(childNodes, (child) => {
          let leaf = (isLeaf && isLeaf(child)) || (!isLeaf && nh.isEmpty(nh.get(child, nodeName)));
          if (!leaf) {
            let removeNode = this.shouldRemoveData(child, nodeName, nodeFinder, keepLeaves, isLeaf);
            matchingLeaf = matchingLeaf || !removeNode;
            return removeNode;
          } else {
            matchingLeaf = matchingLeaf || nodeFinder(child);
            return false;
          }
        });
      } else {
        matchingLeaf = true;
        nh.remove(childNodes, (child) => {
          return this.shouldRemoveData(child, nodeName, nodeFinder, keepLeaves, isLeaf);
        });
      }
    }
    return (nh.isEmpty(childNodes) || !matchingLeaf) && !nodeFinder(nodeData);
  }
}
