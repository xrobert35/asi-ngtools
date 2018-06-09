import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import * as lodash from 'lodash';

@Component({
  selector: 'asi-input',
  templateUrl: 'asi-input.component.html',
  host: { 'class': 'asi-component asi-input' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiInputComponent),
      multi: true
    }
  ]
})
export class AsiInputComponent extends DefaultControlValueAccessor {

  @Input() label: string;
  @Input() placeholder: string = "";
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = "top";

  @Input() pattern: RegExp;

  @Input() maxlength = -1;

  @Input() number = false;

  @Input() delay: number = 0;

  @Input() type: 'password' | 'text' = 'text';

  inputControl = new FormControl();
  @ViewChild("input") inputElm: ElementRef;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, "label-" + this.labelPosition);
    if (this.number == true) {
      this.pattern = new RegExp("^-*[0-9,\.]*$");
    }
  }

  ngAfterViewInit() {
    this.inputControl.valueChanges.pipe(debounceTime(this.delay)).subscribe((value: string) => {
      if (value == "") {
        this.value = null;
      } else if (this.isValide(value)) {
        this.value = value;
      } else if (this.maxlength != -1 && value.length > this.maxlength) {
        //if value is too long, we truncate
        this.value = value.substr(0, this.maxlength);
      }
      this.inputElm.nativeElement.value = this._value;
    });
  }

  private isValide(value: string): boolean {
    return value == null || ((this.maxlength == -1 || value.length <= this.maxlength)
      && (this.pattern == null || this.pattern.test(value)))
  }

  writeValue(value: string) {
    if (this.isValide(value)) {
      this.inputControl.setValue(value, { emitEvent: false });
    } else if (this.maxlength != -1 && value.length > this.maxlength) {
      //Length incorrect on truncate
      this.inputControl.setValue(lodash.truncate(value, { length: this.maxlength }), { emitEvent: false });
    } else {
      //Pattern incorrect
      this.inputElm.nativeElement.value = "Incorrect value";
    }
  }
}