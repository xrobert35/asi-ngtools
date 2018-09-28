import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asiconcat',
  templateUrl: './presentation-asiconcat.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiConcatComponent {

  public list: Array<string> = new Array<string>();
  public listObj: Array<{id: number, value: string}> = new Array<{id: number, value: string}>();

  constructor() {
    this.list.push('I');
    this.list.push('am');
    this.list.push('a');
    this.list.push('list');

    this.listObj.push({id: 1, value: 'https:'});
    this.listObj.push({id: 1, value: ''});
    this.listObj.push({id: 2, value: 'ngtools.asi.fr'});
    this.listObj.push({id: 3, value: 'demo'});
  }
}
