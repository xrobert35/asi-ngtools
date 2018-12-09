import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input, ElementRef, ViewChild, OnInit, Renderer2 } from '@angular/core';
import * as nh from '../../native-helper';

@Component({
  selector: 'asi-input-chips',
  host: { 'class': 'asi-component asi-input-chips' },
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

  @ViewChild('asiInputChips') inputElm: ElementRef;

  @Input() id: string;
  @Input() name: string;

  @Input() label: string;
  @Input() placeholder = '';
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  @Input() maxlength = -1;

  @Input() number = false;

  @Input() delay = 0;

  @Input() uniq = false;

  @Input() chips: Array<string>;

  private _inputValue: any;
  private onChangeCallback: (_: any) => void = () => { };

  get value(): any {
    return this._inputValue;
  };

  set value(v: any) {
    if (v !== this._inputValue) {
      this._inputValue = v;
      this.onChangeCallback(v);
    }
  }

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
    if (!nh.isArray(this.chips)) {
      this.chips = new Array<string>();
    }
  }

  /**
   * Catch on key event to add a chip on pressing 'Enter'
   * @param $event the event thrown by pressing 'Enter' only
   */
  onKey() {
    let inputValue = this.inputElm.nativeElement.value;
    if (this.validateValue(inputValue)) {
      this.chips.push(inputValue);
      this.inputElm.nativeElement.value = '';
    } else {
      // TODO: Push alert
    }
  }

  removeChip(chipIndex: number) {
    nh.removeAtIndex(this.chips, chipIndex);
  }

  validateValue(value: string): boolean {
    return value.length > 0 && !(this.uniq && nh.indexOf(this.chips, value) >= 0);
  }

  writeValue(value: string) {
    this._inputValue = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  focusChip(_chipIndex: number) {
    // defaut implementation
  }
}
