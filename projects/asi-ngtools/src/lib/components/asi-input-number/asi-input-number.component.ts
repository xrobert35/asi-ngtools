import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';


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
  @Input() pattern = new RegExp('^-?[0-9]*[,\.]{0,1}[0-9]{0,2}$');

  /** pattern used to managed typed value, if this pattern is true the 'value' will be the last valide one */
  @Input() toleratePattern = new RegExp('^[0-9]*[,\.]{1}$');

  /** use a non decimal pattern '^-?[0-9]*$' */
  @Input() noDecimal = false;

  @ViewChild('input', {static: false}) inputElm: ElementRef;

  inputControl = new FormControl();
  private oldValideValue: any;

  outputDelayValue = new Subject<number>();

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    if (this.noDecimal) {
      this.pattern = new RegExp('^-?[0-9]*$');
    }

    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);

    this.inputControl.valueChanges.subscribe((value) => {
      if (value === '' || value == null) {
        this.outputDelayValue.next(null);
        this.oldValideValue = null;
        return;
      }

      const tolerateValue = !this.noDecimal && this.toleratePattern.test(value);
      const minusPossible = (this.min == null || this.min < 0) && value.length === 1 && value.indexOf('-') !== -1;

      value = value.replace(',', '\.');

      if (this.pattern.test(value)) {
        if (!isNaN(Number(value))) {
          // The value is a number
          if (!(this.max != null && value > this.max)
            && !(this.min != null && value < this.min) && !tolerateValue) {
            this.outputDelayValue.next(Number(value));
            if (Number(value) !== 0) {
              this.oldValideValue = value;
              return;
            } else {
              this.oldValideValue = 0;
            }
          }
        } else if (minusPossible) {
          this.outputDelayValue.next(null);
          this.oldValideValue = value;
          return;
        }
      }

      if (!tolerateValue && !minusPossible) {
        this.inputControl.setValue(this.oldValideValue, { emitEvent: false });
      } else {
        this.oldValideValue = value;
        this.inputControl.setValue(value, { emitEvent: false });
      }
    });

    this.outputDelayValue.pipe(debounceTime(this.delay)).subscribe((value) => {
      this.value = value;
    });
  }

  increase() {
    if (this.inputControl.value == null || this.inputControl.value === '') {
      this.inputControl.setValue('1');
    } else {
      const number = Number(this.inputControl.value);
      this.inputControl.setValue(number + this.step + '');
    }
  }

  decrease() {
    if (this.inputControl.value == null || this.inputControl.value === '') {
      this.inputControl.setValue('0');
    } else {
      const number = Number(this.inputControl.value);
      this.inputControl.setValue(number - this.step + '');
    }
  }

  writeValue(value: any) {
    if (value != null && this.pattern.test(value)) {
      this.inputControl.setValue(value, { emitEvent: false });
      this._value = value;
    } else {
      this.inputControl.setValue(null, { emitEvent: false });
      this._value = null;
    }
    this.oldValideValue = this._value;
  }
}
