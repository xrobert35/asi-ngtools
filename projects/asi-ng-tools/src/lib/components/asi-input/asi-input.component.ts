import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, OnInit, AfterViewInit, ElementRef, ViewChild, HostBinding } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import * as nh from '../../native-helper';

@Component({
  selector: 'asi-input',
  templateUrl: 'asi-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiInputComponent),
      multi: true
    }
  ]
})
export class AsiInputComponent extends DefaultControlValueAccessor implements OnInit, AfterViewInit {

  @HostBinding('class') class = 'asi-component asi-input';

  @Input() id: string;
  @Input() name: string;

  @Input() label: string;
  @Input() placeholder = '';
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';
  @Input() pattern: RegExp;

  @Input() maxlength = -1;

  @Input() number = false;

  @Input() delay = 0;

  @Input() type: 'password' | 'text' = 'text';

  inputControl = new FormControl();

  @ViewChild('asiInput') inputElm: ElementRef;

  constructor() {
    super();
  }

  ngOnInit() {
    this.class += ' label-' + this.labelPosition;
    if (this.number) {
      this.pattern = new RegExp('^-*[0-9,\.]*$');
    }
  }

  ngAfterViewInit() {
    this.inputControl.valueChanges.pipe(debounceTime(this.delay)).subscribe((value: string) => {
      if (value === '') {
        this.value = null;
      } else if (this.isValide(value)) {
        this.value = value;
      } else if (this.maxlength !== -1 && value.length > this.maxlength) {
        // if value is too long, we truncate
        this.value = value.substr(0, this.maxlength);
      }
      this.inputElm.nativeElement.value = this._value;
    });
  }

  private isValide(value: string): boolean {
    return value == null || ((this.maxlength === -1 || value.length <= this.maxlength)
      && (this.pattern == null || this.pattern.test(value)))
  }

  writeValue(value: string) {
    if (this.isValide(value)) {
      this.inputControl.setValue(value, { emitEvent: false });
    } else if (this.maxlength !== -1 && value.length > this.maxlength) {
      // Length incorrect on truncate
      this.inputControl.setValue(nh.truncate(value, this.maxlength), { emitEvent: false });
    } else {
      // Pattern incorrect
      this.inputElm.nativeElement.value = 'Incorrect value';
    }
  }
}
