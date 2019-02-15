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

  @Input() noDecimal = false;

  @ViewChild('input') inputElm: ElementRef;

  inputControl = new FormControl();

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    if (this.noDecimal) {
      this.pattern = new RegExp('^-*[0-9]*$');
    }

    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);

    this.inputControl.valueChanges.pipe(debounceTime(this.delay)).subscribe((value) => {
      if (value === '') {
        value = null;
      }
      if (value != null && this.pattern.test(value)) {
        if (this.max != null && value > this.max) {
          value = Number(value).toString().substr(0, this.max.toString().length);
        }
        if (this.min != null && value < this.min) {
          value = this.min;
        }
        if (!isNaN(Number(value))) {
          this.value = Number(value);
        }
      } else if (value == null) {
        this.value = value;
      }
      this.inputControl.setValue(this._value, { emitEvent: false});
    });
  }

  increase() {
    if (this.value == null) {
      this.inputControl.setValue(1);
    } else if (this.max == null || this.value < this.max) {
      this.inputControl.setValue(this.value + this.step);
    }
  }

  decrease() {
    if (this.value == null) {
      this.inputControl.setValue(0);
    } else if (this.min == null || this.value > this.min) {
      this.inputControl.setValue(this.value - this.step);
    }
  }

  writeValue(value: any) {
    if (value != null) {
      if (this.pattern.test(value)) {
        this.inputControl.setValue(value, { emitEvent: false });
        this._value = value;
      } else {
        this.inputControl.setValue(null, { emitEvent: false });
      }
    }
  }
}
