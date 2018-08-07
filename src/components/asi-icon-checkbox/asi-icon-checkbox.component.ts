import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { Component, Input, OnInit, forwardRef, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'asi-icon-checkbox',
  templateUrl: 'asi-icon-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiIconCheckboxComponent),
      multi: true
    }
  ]
})
export class AsiIconCheckboxComponent extends DefaultControlValueAccessor implements OnInit {

  @HostBinding('class') class = 'asi-component asi-icon-checkbox';

  @Input() label: string;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  @Input() disabled = false;
  @Input() icon = 'fa-question';
  @Input() size = '2x';

  constructor() {
    super();
  }

  ngOnInit() {
    this.class += ' label-' + this.labelPosition;
  }

  toggleCheck() {
    if (!this.disabled) {
      this.value = !this.value;
    }
  }
}
