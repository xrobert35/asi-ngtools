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

  /** html id */
  @Input() id: string;
  /** html name */
  @Input() name: string;

  /** Label to display (is translated) */
  @Input() label: string;
  /**Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  /** Placeholder to display */
  @Input() placeholder = '';

  /** Max length of the text */
  @Input() maxlength = -1;

  /** Must be a number (internaly set the regex to ^-*[0-9,\.]*$ */
  @Input() number = false;

  /** Delay before the component change value */
  @Input() delay = 0;

  /** Allow you to define only one value */
  @Input() uniq = false;

  /** Init data */
  @Input() chips: Array<string>;

  @ViewChild('asiInputChips', {static: false}) inputElm: ElementRef;

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
