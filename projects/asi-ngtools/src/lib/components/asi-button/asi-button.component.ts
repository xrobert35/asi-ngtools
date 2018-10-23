import { Component, Input, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'asi-button',
  templateUrl: 'asi-button.component.html',
})
export class AsiButtonComponent implements OnInit {

  @HostBinding('class') class = 'asi-component asi-button';

  @Input() design: 'flat' | 'raised' | 'bordered' = 'flat';
  @Input() type: 'submit' | 'button' = 'button';
  @Input() size: 'standard' | 'small' | 'mini' = 'standard';
  @Input() disabled = false;

  ngOnInit() {
    this.class += ` button-${this.design} button-${this.size}`;
  }
}
