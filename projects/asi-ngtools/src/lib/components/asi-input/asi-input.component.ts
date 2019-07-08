import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import * as nh from '../../native-helper';

@Component({
  selector: 'asi-input',
  host: { 'class': 'asi-component asi-input' },
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

  /** html id */
  @Input() id: string;
  /** html name */
  @Input() name: string;
  /** html input type */
  @Input() type: 'password' | 'text' = 'text';

  /** Label to display (is translated)*/
  @Input() label: string;
  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  /** placeholder (is translated) */
  @Input() placeholder = '';

  /** Allow you to define a regex that the input must respect */
  @Input() pattern: RegExp;

  /** Max length of the text */
  @Input() maxlength = -1;

  /** Must be a number (internaly set the regex to ^-*[0-9,\.]*$ */
  @Input() number = false;

  /** Delay before the component change value */
  @Input() delay = 0;

  inputControl = new FormControl();

  @ViewChild('asiInput', {static: false}) inputElm: ElementRef;

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
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
