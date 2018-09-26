import { Component, Input, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'asi-link-button',
  templateUrl: 'asi-link-button.component.html'
})
export class AsiLinkButtonComponent implements OnInit {

  @HostBinding('class') class = 'asi-component asi-link-button';

  @Input() design: 'flat' | 'raised' | 'bordered' = 'flat';
  @Input() href = '';
  @Input() target: '_blank' | '_self' | '_parent' | '_top' = '_self';
  @Input() disabled = false;

  constructor() {
  }

  ngOnInit() {
    this.class += ' link-button-' + this.design;
  }
}
