import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, ElementRef, ViewChild, OnInit, AfterViewInit, Renderer2 } from '@angular/core';

import * as nh from '../../native-helper';

@Component({
  selector: 'asi-textarea',
  host: { 'class': 'asi-component asi-textarea' },
  templateUrl: 'asi-textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiTextareaComponent),
      multi: true
    }
  ]
})
export class AsiTextareaComponent extends DefaultControlValueAccessor implements OnInit, AfterViewInit {

  @Input() label: string;
  @Input() placeholder = '';
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';
  @Input() rows = 2;
  @Input() cols = 100;
  @Input() maxlength = -1;

  @Input() pattern: RegExp;

  textareaControl = new FormControl();

  @ViewChild('textarea') textareaElm: ElementRef;

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
  }

  ngAfterViewInit(): void {
    this.textareaControl.valueChanges.subscribe((value) => {
      if (value === '') {
        this.value = null;
      } else if (this.isValide(value)) {
        this.value = value;
      } else if (this.maxlength !== -1 && value.length > this.maxlength) {
        // si la taille n'est pas respectée on coupe
        this.value = value.substr(0, this.maxlength);
      }
      this.textareaElm.nativeElement.value = this._value;
    });
  }

  private isValide(value: string): boolean {
    return value == null || ((this.maxlength === -1 || value.length <= this.maxlength)
      && (this.pattern == null || this.pattern.test(value)))
  }

  writeValue(value: string): void {
    if (this.isValide(value)) {
      this.textareaControl.setValue(value, { emitEvent: false });
    } else if (this.maxlength !== -1 && value.length > this.maxlength) {
      // Length incorrect on truncate
      this.textareaControl.setValue(nh.truncate(value, this.maxlength), { emitEvent: false });
    } else {
      // Pattern incorrect
      this.textareaElm.nativeElement.value = 'Incorrect value';
    }
  }
}
