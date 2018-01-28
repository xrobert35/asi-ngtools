import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';

import * as lodash from 'lodash';

@Component({
  selector: 'asi-textarea',
  templateUrl: 'asi-textarea.component.html',
  host: { 'class': 'asi-component asi-textarea' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiTextareaComponent),
      multi: true
    }
  ]
})
export class AsiTextareaComponent extends DefaultControlValueAccessor {

  @Input() label: string;
  @Input() placeholder: string = "";
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = "top";
  @Input() rows : number = 1;
  @Input() maxlength = -1;

  @Input() pattern: RegExp;

  textareaControl = new FormControl();

  @ViewChild("textarea") textareaElm: ElementRef;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, "label-" + this.labelPosition);
  }

  ngAfterViewInit(): void {
    this.textareaControl.valueChanges.subscribe((value) => {
      if (value == "") {
        this.value = null;
      } else if (this.isValide(value)) {
        this.value = value;
      } else if (this.maxlength != -1 && value.length > this.maxlength) {
        //si la taille n'est pas respectée on coupe
        this.value = value.substr(0, this.maxlength);
      }
      this.textareaElm.nativeElement.value = this._value;
    });
  }

  private isValide(value: string): boolean {
    return value == null || ((this.maxlength == -1 || value.length <= this.maxlength)
      && (this.pattern == null || this.pattern.test(value)))
  }

  writeValue(value: string): void {
    if (this.isValide(value)) {
      this.textareaControl.setValue(value, { emitEvent: false });
    } else if (this.maxlength != -1 && value.length > this.maxlength) {
      //Length incorrect on truncate
      this.textareaControl.setValue(lodash.truncate(value, { length: this.maxlength }), { emitEvent: false });
    } else {
      //Pattern incorrect
      this.textareaElm.nativeElement.value = "Incorrect value";
    }
  }
}