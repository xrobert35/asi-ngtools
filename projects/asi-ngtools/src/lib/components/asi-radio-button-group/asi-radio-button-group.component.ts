import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { AsiRadioButtonComponent } from './asi-radio-button/asi-radio-button.component';
import {
  Input, Component, TemplateRef, ViewChild, ContentChildren, QueryList,
  forwardRef, OnInit, AfterContentInit, ElementRef, Renderer2
} from '@angular/core';

import * as nh from '../../native-helper'

@Component({
  selector: 'asi-radio-button-group',
  templateUrl: 'asi-radio-button-group.component.html',
  host: { 'class': 'asi-component asi-radio-button-group' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiRadioButtonGroupComponent),
      multi: true
    }
  ]
})
export class AsiRadioButtonGroupComponent extends DefaultControlValueAccessor implements OnInit, AfterContentInit {

  /** Label to display (is translated) */
  @Input() label: string;
  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  /** Vertical / Horizontal */
  @Input() vertical = false;

  /** Allow you to select multiple value */
  @Input() multiple = false;

  /** Track data base on a sub attribute rather than reference  */
  @Input() trackBy: string = null;

  @ContentChildren(AsiRadioButtonComponent) queryRadios: QueryList<AsiRadioButtonComponent>;

  @ViewChild(TemplateRef) contentTemplate: TemplateRef<any>;

  radios = new Array<AsiRadioButtonComponent>();

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
    if (this.vertical) {
      this.renderer.addClass(this.elementRef.nativeElement, 'asi-vertical');
    }
  }

  getRadios() {
    return this.radios;
  }

  onRadioChecked(radioEvent: { index: number, value: boolean }) {
    const radio = this.getRadioForIndex(radioEvent.index);
    if (radioEvent.value) {
      if (this.multiple) {
        if (this.value == null) {
          this._value = [];
        }
        this._value.push(radio.value);
      } else {
        this._value = radio.value;
      }
    } else {
      if (this.multiple) {
        nh.remove(this._value, (value) => {
          if (this.trackBy != null) {
            return radio.value[this.trackBy] === value[this.trackBy];
          } else {
            return radio.value === value;
          }
        });
      } else {
        this._value = null;
      }
    }

    // fire model change
    this.value = this._value;
    this.initRadioButton(this.value);
  }

  private getRadioForIndex(index: number) {
    return nh.find(this.radios, (radio) => {
      return radio.index === index;
    });
  }

  ngAfterContentInit() {
    let index = -1;
    this.queryRadios.forEach(radio => {
      radio.index = ++index;
      this.radios.push(radio)
    });

    this.queryRadios.changes.subscribe((items) => {
      this.radios = [];
      index = -1;
      items.forEach(radio => {
        radio.index = ++index;
        this.radios.push(radio)
      });
    });

    this.initRadioButton(this.value);
  }

  writeValue(value: any) {
    if (this.multiple && !nh.isArray(value) && value != null) {
      value = [value];
    }
    this._value = value;
    this.initRadioButton(value);
  }

  private initRadioButton(value: any) {
    if (nh.isEmpty(value)) {
      this.radios.forEach((radio) => {
        radio.active = false;
      });
    } else {
      if (nh.isArray(value)) {
        this.radios.forEach((radio) => {
          if (this.trackBy != null) {
            radio.active = nh.find(this.value, (val) => {
              return radio.value[this.trackBy] === val[this.trackBy];
            }) != null;
          } else {
            radio.active = nh.find(this.value, (val) => {
              return radio.value === val;
            }) != null;
          }
        });
      } else {
        if (this.trackBy != null) {
          this.radios.forEach((radio) => {
            radio.active = radio.value[this.trackBy] === value[this.trackBy];
          });
        } else {
          this.radios.forEach((radio) => {
            radio.active = (radio.value === value)
          });
        }
      }
    }
  }
}
