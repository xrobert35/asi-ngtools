import { Component, Input, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'asi-button',
  templateUrl: 'asi-button.component.html',
})
export class AsiButtonComponent implements OnInit {

  @HostBinding('class') class = 'asi-component asi-button';

  @Input() design: 'flat' | 'raised' | 'bordered' = 'flat';
  @Input() type: 'submit' | 'button' = 'button';
  @Input() small = false;
  @Input() disabled = false;

  constructor() {}

  ngOnInit() {
    this.class += ' button-' + this.design;
    if (this.small) {
      this.class += ' button-small';
    }
  }
}
