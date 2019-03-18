import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-tree-select',
  templateUrl: './presentation-asi-tree-select.component.html'
})
export class TreeSelectComponent {

  items = [
    {
      id: 1,
      label: 'parent 1',
      children: [
        {
          id: 2,
          label: 'parent 1-1',
          children: [
            {
              id: 3,
              label: 'child 1-1-1',
              children: []
            },
            {
              id: 4,
              label: 'child 1-1-2',
              children: []
            }
          ]
        },
        {
          id: 5,
          label: 'child 1-2',
          children: []
        },
        {
          id: 6,
          label: 'child 1-3',
          children: []
        }
      ]
    }, {
      id: 7,
      label: 'child 2',
      children: []
    }
  ];

  filter = (item: any, filter: string) => {
    return item && item['label'] && item['label'].indexOf(filter) >= 0;
  }

}
