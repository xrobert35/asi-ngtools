import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input, ContentChild, OnInit, OnChanges, forwardRef, Renderer2, ElementRef } from '@angular/core';

import {
  AsiComponentTemplateOptionDef, AsiComponentTemplateEmptyDef,
  AsiComponentTemplateSelectedDef
} from '../common/asi-component-template';

import * as nh from '../../native-helper';

@Component({
  selector: 'asi-select',
  host: { 'class': 'asi-component asi-select' },
  templateUrl: 'asi-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiSelectComponent),
      multi: true
    }
  ]
})
export class AsiSelectComponent extends DefaultControlValueAccessor implements OnInit, OnChanges {

  /** Label to display (is translated) */
  @Input() label: string;

  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  /** Data to display  */
  @Input() data: Array<any>;

  /** Multi selection  */
  @Input() multiple = false;

  /** Track data base on a sub attribute rather than reference  */
  @Input() trackBy: string;

  /** Add an empty value (template must be define) */
  @Input() withEmptyValue = false;

  @ContentChild(AsiComponentTemplateOptionDef) optionDef: AsiComponentTemplateOptionDef;
  @ContentChild(AsiComponentTemplateEmptyDef) emptyDef: AsiComponentTemplateEmptyDef;
  @ContentChild(AsiComponentTemplateSelectedDef) selectedDef: AsiComponentTemplateSelectedDef;

  // Copie des données d'entrée
  selectDatas: Array<any>;
  open = false;
  allChecked = false;

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
    if (this.multiple) {
      this.renderer.addClass(this.elementRef.nativeElement, 'multiple');
    }
  }

  onDropdownClose() {
    this.open = false;
  }

  public isOpened() {
    return this.open;
  }

  ngOnChanges() {
    this.initData();
  }

  private initData() {
    this.selectDatas = [];
    this.data = this.data || [];

    if (this.withEmptyValue) {
      this.selectDatas.push(null);
    }

    this.data.forEach((data) => {
      const proxyData = {
        selected: false,
        value: data
      }
      this.selectDatas.push(proxyData);
    });
  }

  checkAll(value: any): void {
    this.allChecked = value;
    this.selectDatas.forEach((data) => {
      if (data != null && (value !== data.selected)) {
        this.internalSelectValue(null, data);
      }
    });
    this.onModelChange(this._value);
  }

  updateAllChecked(): void {
    this.allChecked = nh.find(this.selectDatas, (data) => {
      return data != null ? !data.selected : false;
    }) == null;
  }

  selectValue(event: MouseEvent, data: any) {
    this.internalSelectValue(event, data);
    this.onModelChange(this._value);
  }

  private internalSelectValue(event: MouseEvent, data: any) {
    if (data == null) {
      this.onModelChange(null);
      this.open = false;
      return;
    }

    let realValue = data.value;
    if (this.multiple) {
      if (event != null) {
        event.stopPropagation();
      }

      if (this._value == null) {
        this._value = [];
      }

      let removed = nh.remove(this._value, (value: any) => {
        if (value != null) {
          if (this.trackBy != null) {
            return value[this.trackBy] === realValue[this.trackBy];
          } else {
            return value === realValue;
          }
        }
        return false;
      });

      if (nh.isEmpty(removed)) {
        this.value.push(realValue);
        data.selected = true;
      } else {
        data.selected = false;
      }

      if (nh.isEmpty(this._value)) {
        this._value = null;
      }

      if (event != null) {
        this.updateAllChecked();
      }
    } else {
      this.open = false;
      this._value = realValue;
    }
  }

  toggleSelect(): void {
    this.open = !this.open;
  }

  writeValue(value: any) {
    if (isNaN(value) && nh.isEmpty(value)) {
      this._value = null;
    } else {
      this._value = value;
    }
    if (this.multiple) {
      if (this._value != null) {
        this.selectDatas.forEach((data) => {
          if (data != null) {
            data.selected = nh.find(this.value, (possibleValue: any) => {
              if (possibleValue != null) {
                if (this.trackBy != null) {
                  return possibleValue[this.trackBy] === data.value[this.trackBy];
                } else {
                  return possibleValue === data.value;
                }
              }
              return false;
            }) != null;
          }
        });
      } else {
        this.selectDatas.forEach((data) => {
          if (data != null) {
            data.selected = false;
          }
        });
      }
      this.updateAllChecked();
    }
  }

  onModelChange(value: any) {
    this.value = value;
    if (this.value != null) {
      this.renderer.addClass(this.elementRef.nativeElement, 'has-value');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'has-value');
    }
  }
}
