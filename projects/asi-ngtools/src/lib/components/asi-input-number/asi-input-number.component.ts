import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'asi-input-number',
  host: { 'class': 'asi-component asi-input-number' },
  templateUrl: 'asi-input-number.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiInputNumberComponent),
      multi: true
    }
  ]
})
export class AsiInputNumberComponent extends DefaultControlValueAccessor implements OnInit {

  @Input() id: string;
  @Input() name: string;

  @Input() label: string;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';
  @Input() step = 1;
  @Input() disableInput = false;

  @Input() hiddeAction = false;

  @Input() min: number;
  @Input() max: number;

  @Input() delay = 0;

  @ViewChild('input') inputElm: ElementRef;

  inputControl = new FormControl();
  pattern = new RegExp('^-*[0-9]*$');

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);

    this.inputControl.valueChanges.pipe(debounceTime(this.delay)).subscribe((value) => {
      if (value === '') {
        value = null;
      }
      if (value != null && this.pattern.test(value)) {
        if (this.max != null && value > this.max) {
          value = this.max;
        }
        if (this.min != null && value < this.min) {
          value = this.min;
        }
        this.value = Number(value);
      } else if (value == null) {
        this.value = Number(value);
      }
      this.inputElm.nativeElement.value = this._value;
    });
  }
  increase() {
    if (this.value == null) {
      this.inputControl.setValue(0);
    } else if (this.max == null || this.inputControl.value < this.max) {
      this.inputControl.setValue(this.inputControl.value + this.step);
    }
  }

  decrease() {
    if (this.value == null) {
      this.inputControl.setValue(0);
    } else if (this.min == null || this.inputControl.value > this.min) {
      this.inputControl.setValue(this.inputControl.value - this.step);
    }
  }

  writeValue(value: any) {
    if (value != null) {
      if (this.pattern.test(value)) {
        this.inputControl.setValue(value, { emitEvent: false });
        this._value = value;
      } else {
        this.inputElm.nativeElement.value = 'NaN';
      }
    }
  }
}
