import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, ElementRef, Renderer2, ViewChild, OnInit, HostBinding } from '@angular/core';
import * as lodash from 'lodash';

@Component({
  selector: 'asi-input-chips',
  templateUrl: 'asi-input-chips.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiInputChipsComponent),
      multi: true
    }
  ]
})
export class AsiInputChipsComponent extends DefaultControlValueAccessor implements OnInit {

  @HostBinding('class') class = 'asi-component asi-input-chips';
  @ViewChild('inputchips') inputElm: ElementRef;

  @Input() label: string;
  @Input() placeholder = '';
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  @Input() maxlength = -1;

  @Input() number = false;

  @Input() delay = 0;

  @Input() uniq = false;

  @Input() chips: Array<string>;
  public inputControl = new FormControl();

  private _inputValue: any;
  private onChangeCallback: (_: any) => void = () => {};

  get value(): any {
    return this._inputValue;
  };

  set value(v: any) {
    if (v !== this._inputValue) {
        this._inputValue = v;
        this.onChangeCallback(v);
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    if (!lodash.isArray(this.chips)) {
      this.chips = new Array<string>();
    }
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
  }

  /**
   * Catch on key event to add a chip on pressing 'Enter'
   * @param $event the event thrown by pressing 'Enter' only
   */
  onKey($event: KeyboardEvent) {
    let inputValue = this.inputElm.nativeElement.value;
    if (this.validateValue(inputValue)) {
      this.chips.push(inputValue);
      this.inputElm.nativeElement.value = '';
    } else {
      // TODO: Push alert
    }
  }

  removeChip(chipIndex: number) {
    lodash.pullAt(this.chips, chipIndex);
  }

  validateValue(value: string): boolean {
    return value.length > 0 && !(this.uniq && lodash.indexOf(this.chips, value) >= 0);
  }

  writeValue(value: string) {
    // this.inputControl.setValue(value, { emitEvent: false });
    this._inputValue = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
}
