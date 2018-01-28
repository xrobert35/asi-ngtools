import { Input, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export class DefaultControlValueAccessor implements ControlValueAccessor {

  @Input('value') _value: any;

  @Input() disabled: boolean = false;

  @Output() onValueChange = new EventEmitter();

  onChange: any = () => { };
  onTouched: any = () => { };

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
    this.onValueChange.emit(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this._value = value;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}