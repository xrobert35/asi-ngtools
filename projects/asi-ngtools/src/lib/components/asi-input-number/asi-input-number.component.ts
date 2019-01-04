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

  /** html id */
  @Input() id: string;
  /** html name */
  @Input() name: string;

  /** Label to display (is translated) */
  @Input() label: string;
  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  /** Increment value when click on + or - */
  @Input() step = 1;

  /** Allow you to disable the input */
  @Input() disableInput = false;

  /** Allow you to hide the action button */
  @Input() hideAction = false;

  /** Min value */
  @Input() min: number;

  /** Max value */
  @Input() max: number;

  /** Delay before value change */
  @Input() delay = 0;

  /** Number regex */
  @Input() pattern = new RegExp('^-*[0-9,\.]*$');

  @ViewChild('input') inputElm: ElementRef;

  inputControl = new FormControl();

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
