import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-bind-html',
  templateUrl: './presentation-asi-bind-html.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiBindHtmlComponent {

  myTemplate = "<div *ngFor='let test of [0,1,2]'><span> {{test}} </span></div>";

  constructor() {
  }
}