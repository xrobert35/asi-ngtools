import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {
  Component, forwardRef, Input, Output, OnInit, EventEmitter,
  ElementRef, ViewChild, AfterViewInit, Renderer2
} from '@angular/core';

import * as nh from '../../native-helper';

@Component({
  selector: 'asi-input-icon',
  host: { 'class': 'asi-component asi-input-icon' },
  templateUrl: 'asi-input-icon.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiInputIconComponent),
      multi: true
    }
  ]
})
export class AsiInputIconComponent extends DefaultControlValueAccessor implements OnInit, AfterViewInit {

  /** html id */
  @Input() id: string;
  /** html name */
  @Input() name: string;
  /** html input type */
  @Input() type: 'password' | 'text' = 'text';

  /** Label to display (is translated) */
  @Input() label: string;
  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';
  /** Placeholder to display */
  @Input() placeholder = '';

  /** Icon to display */
  @Input() icon: string;
  /** Icon position */
  @Input() iconPosition: 'left' | 'right' = 'left';

  /** Allow you to define a regex that the input must respect */
  @Input() pattern: RegExp;

  /** Max length of the text */
  @Input() maxlength = -1;

  /** Delay before the component change value */
  @Input() delay = 0;

  /** Must be a number (internaly set the regex to ^-*[0-9,\.]*$ */
  @Input() number = false;

  /** Event emitted when the icon is clicked */
  @Output('iconClicked') iconClicked = new EventEmitter<any>();

  inputControl = new FormControl();

  @ViewChild('asiInputIcon', { static: false }) inputElm: ElementRef;

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
    if (this.number === true) {
      this.pattern = new RegExp('^-*[0-9,\.]*$');
    }
  }

  ngAfterViewInit() {
    this.inputControl.valueChanges.pipe(debounceTime(this.delay)).subscribe((value: string) => {
      if (value === '') {
        this.value = null;
      } else if (this.isValide(value)) {
        this.value = value;
      } else if (this.maxlength !== -1 && value.length > this.maxlength) {
        // if value is too long, we truncate
        this.value = value.substr(0, this.maxlength);
      }
      this.inputElm.nativeElement.value = this._value;
    });
  }

  private isValide(value: string): boolean {
    return value == null || ((this.maxlength === -1 || value.length <= this.maxlength)
      && (this.pattern == null || this.pattern.test(value)))
  }

  writeValue(value: string) {
    if (this.isValide(value)) {
      this.inputControl.setValue(value, { emitEvent: false });
    } else if (this.maxlength !== -1 && value.length > this.maxlength) {
      // Length incorrect on truncate
      this.inputControl.setValue(nh.truncate(value, this.maxlength), { emitEvent: false });
    } else {
      // Pattern incorrect
      this.inputElm.nativeElement.value = 'Incorrect value';
    }
  }

  public handleIconClick() {
    this.iconClicked.emit();
  }
}
