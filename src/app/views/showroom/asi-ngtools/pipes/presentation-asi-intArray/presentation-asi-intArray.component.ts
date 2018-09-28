import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-intarray',
  templateUrl: './presentation-asi-intArray.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiIntArrayComponent {

  myNumber: number = 10;

  constructor() {
  }

}