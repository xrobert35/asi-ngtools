import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input, ContentChild, OnInit, OnChanges, forwardRef, HostBinding } from '@angular/core';

import {
  AsiComponentTemplateOptionDef, AsiComponentTemplateEmptyDef,
  AsiComponentTemplateSelectedDef
} from '../common/asi-component-template';

import * as lodash from 'lodash';

@Component({
  selector: 'asi-select',
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

  @HostBinding('class') class = 'asi-component asi-select';

  @Input() label: string;
  @Input() disabled = false;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  @Input() data: Array<any>;
  @Input() multiple = false;
  @Input() trackBy: string;

  @Input() withEmptyValue = false;

  @ContentChild(AsiComponentTemplateOptionDef) optionDef: AsiComponentTemplateOptionDef;
  @ContentChild(AsiComponentTemplateEmptyDef) emptyDef: AsiComponentTemplateEmptyDef;
  @ContentChild(AsiComponentTemplateSelectedDef) selectedDef: AsiComponentTemplateSelectedDef;

  // Copie des données d'entrée
  selectDatas: Array<any>;
  open = false;
  allChecked = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.class += ' label-' + this.labelPosition;
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
        this.selectValue(null, data);
      }
    });
  }

  updateAllChecked(): void {
    this.allChecked = lodash.find(this.selectDatas, (data) => {
      return data != null ? !data.selected : false;
    }) == null;
  }

  selectValue(event: MouseEvent, data: any) {
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

      let removed = lodash.remove(this._value, (value: any) => {
        if (value != null) {
          if (this.trackBy != null) {
            return value[this.trackBy] === realValue[this.trackBy];
          } else {
            return value === realValue;
          }
        }
        return false;
      });

      if (lodash.isEmpty(removed)) {
        this.value.push(realValue);
        data.selected = true;
      } else {
        data.selected = false;
      }

      if (lodash.isEmpty(this._value)) {
        this.value = null;
      }

      if (event != null) {
        this.updateAllChecked();
      }

      this.onModelChange(this._value);
    } else {
      this.onModelChange(realValue);
      this.open = false;
    }
  }

  toggleSelect(): void {
    this.open = !this.open;
  }

  writeValue(value: any) {
    if (isNaN(value) && lodash.isEmpty(value)) {
      this._value = null;
    } else {
      this._value = value;
    }
    if (this.multiple) {
      if (this._value != null) {
        this.selectDatas.forEach((data) => {
          if (data != null) {
            data.selected = lodash.find(this.value, (possibleValue: any) => {
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
  }
}
