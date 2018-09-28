import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asidate',
  templateUrl: './presentation-asidate.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiDateComponent {

  today = new Date();

  constructor(){

  }

}