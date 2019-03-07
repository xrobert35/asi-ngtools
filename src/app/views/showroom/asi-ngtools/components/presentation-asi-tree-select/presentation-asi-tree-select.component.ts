import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-tree-select',
  templateUrl: './presentation-asi-tree-select.component.html'
})
export class PresentationAsiTreeSelectComponent {

  items = [
    {
      id: 1,
      label: 'niveau 1',
      children: [
        {
          id: 2,
          label: 'niveau 1-1',
          children: [
            {
              id: 3,
              label: 'niveau 1-1-1',
              children: []
            },
            {
              id: 4,
              label: 'niveau 1-1-2',
              children: []
            }
          ]
        },
        {
          id: 5,
          label: 'niveau 1-2',
          children: []
        },
        {
          id: 6,
          label: 'niveau 1-3',
          children: []
        }
      ]
    }, {
      id: 7,
      label: 'niveau 2',
      children: []
    }
  ];

  filter = (item: any, filter: string) => {
    return item && item['label'] && item['label'].indexOf(filter) >= 0;
  }

}
