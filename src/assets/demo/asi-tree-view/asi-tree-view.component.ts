import { Component, ViewChild } from '@angular/core';
import { AsiTreeViewComponent, AsiTreeViewNodeComponent } from '@asi-ngtools/lib';

import * as lodash from 'lodash';

@Component({
  selector: 'presentation-asi-tree-view',
  templateUrl: './presentation-asi-tree-view.component.html'
})
export class PresentationAsiTreeViewComponent {

  data = [{
    name: 'Folder1',
    type: 'folder',
    documents: [
      {
        name: 'SubFolder2',
        type: 'folder',
        documents: [{
          name: 'File 1',
          type: 'file'
        },
        {
          name: 'SubFolder5',
          type: 'folder'
        }]
      },
      {
        name: 'File 2',
        type: 'file'
      },
      {
        name: 'SubFolder3',
        type: 'folder',
        documents: [{
          name: 'File 1',
          type: 'file'
        },
        {
          name: 'SubFolder5',
          type: 'folder'
        }]
      },
    ]
  },
  {
    name: 'File 3',
    type: 'file'
  }];

  nodeName = 'documents';

  @ViewChild(AsiTreeViewComponent, /* TODO: add static flag */ {}) asiTreeView: AsiTreeViewComponent;

  constructor() {
  }

  isLeaf(data: any) {
    return data.type === 'file';
  };

  openNode() {
    this.asiTreeView.openNode((node: any) => {
      return node.name === 'File 1';
    });
  }

  closeAll() {
    this.asiTreeView.closeAll();
  }

  openAll() {
    this.asiTreeView.openAll();
  }

  onNodeSelected(node: AsiTreeViewNodeComponent) {
    if (node.data.name === 'SubFolder5') {
      node.data.documents = [
        {
          name: 'File 2',
          type: 'file'
        },
        {
          name: 'File 3',
          type: 'file'
        },
        {
          name: 'File 4',
          type: 'file'
        },
      ];
      node.refresh();
    }
  }

  filterTreeDataKeepLeaves(filter: string) {
    this.asiTreeView.filterNodes((nodeData: any) => {
      return filter == null || lodash.startsWith(nodeData.name, filter);
    }, true, (nodeData: any) => {
      return nodeData.type === 'file'
    });
  }

  filterTreeData(filter: string) {
    this.asiTreeView.filterNodes((nodeData: any) => {
      return filter == null || lodash.startsWith(nodeData.name, filter);
    });
  }
}
