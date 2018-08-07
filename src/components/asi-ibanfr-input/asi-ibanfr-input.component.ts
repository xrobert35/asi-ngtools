import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'asi-ibanfr-input',
  templateUrl: 'asi-ibanfr-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiIbanFRInputComponent),
      multi: true
    }
  ]
})
export class AsiIbanFRInputComponent extends DefaultControlValueAccessor implements OnInit {

  @HostBinding('class') class = 'asi-component asi-ibanfr-input';

  @Input() label: string;
  @Input() placeholder = ''
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  bank: string;
  branch: string;
  account: string;
  key: string;

  countryControl = new FormControl();


  constructor() {
    super();
    this.countryControl.valueChanges.subscribe((value: string) => {
      if (value === '') {
        console.log('value ' + value);
      }
    });
  }

  ngOnInit() {
    this.class += ' label-' + this.labelPosition;
  }
}
