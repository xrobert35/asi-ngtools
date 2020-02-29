import {
  Component, Input, forwardRef, OnInit, ElementRef, ContentChild,
  ViewChild, OnChanges, Renderer2
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { DefaultControlValueAccessor } from './../../common/default-control-value-accessor';
import { AsiComponentTemplateOptionDef, AsiComponentTemplateTagDef } from './../../common/asi-component-template';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import * as nh from '../../../native-helper'
/**
 * asi-autocomplete-multiple component
 */
@Component({
  selector: 'asi-autocomplete-multiple',
  templateUrl: 'asi-autocomplete-multiple.component.html',
  host: { 'class': 'asi-component asi-autocomplete-multiple' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiAutoCompleteMultipleComponent),
      multi: true
    }
  ]
})
export class AsiAutoCompleteMultipleComponent extends DefaultControlValueAccessor implements OnInit, OnChanges {

  /** html id */
  @Input() id: string;
  /** html name */
  @Input() name: string;

  /** Label to display (is translated) */
  @Input() label: string;

  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  /** Placeholder if needed */
  @Input() placeholder = '';

  /** Delay between the moment you stop typing and onRequestData is called */
  @Input() delay = 500;

  /** Option to keep the list open once an item is selected */
  @Input() closeAfterSelect = false;

  /** Function called to request new data (can return Observable/Promise/Object) : Throw error if null */
  @Input() onRequestData: Function;

  @ContentChild(AsiComponentTemplateOptionDef, {static: true}) optionDef: AsiComponentTemplateOptionDef;
  @ContentChild(AsiComponentTemplateTagDef, {static: true}) tagDef: AsiComponentTemplateTagDef;

  @ViewChild('container', {static: true}) container: ElementRef;

  data: Array<any>;

  autoCompleteControl = new FormControl();
  open = false;

  // Var used to manage component initialization
  firstRequestDone: Boolean = null;
  init = false;

  currentValue: any = null;

  constructor(private renderer: Renderer2) {
    super();
  }

  private checkInput() {
    if (null == this.onRequestData) {
      throw new Error('AsiAutoCompleteMultipleComponent : @Input \'onRequestData\' is required');
    }
  }

  ngOnInit() {
    this.checkInput();
    this.renderer.addClass(this.container.nativeElement, 'label-' + this.labelPosition);

    this.autoCompleteControl.valueChanges.pipe(debounceTime(this.delay),
      tap(value => this.currentValue = value),
      switchMap((value) => nh.observe(this.onRequestData(value, !this.firstRequestDone))))
      .subscribe((data: any) => {
        this.data = data;
        if (this.firstRequestDone && data && data.length > 0) {
          this.open = true;
        }
        this.firstRequestDone = true;
      });
  }

  onDropdownClose() {
    this.open = false;
  }

  ngOnChanges() {
    if (this.init) {
      this.open = true;
    } else {
      if (this.firstRequestDone) {
        this.init = true;
      }
    }
  }

  addValue(data: any) {
    if (this.value == null) {
      this.value = [];
    }
    this.value.push(data);
    if (this.closeAfterSelect) {
      this.open = false;
    }
  }

  removeValue(data: any) {
    nh.remove(this.value, (value) => {
      return data === value;
    });

    if (nh.isEmpty(this.value)) {
      this.value = null;
    }
  }

  writeValue(value: any) {
    this._value = value;
    if (this.init === false) {
      this.autoCompleteControl.setValue(this.currentValue);
    } else {
      this.currentValue = value;
      if (this.value == null) {
        this.autoCompleteControl.setValue(this.currentValue, { emitEvent: false });
      }
    }
  }
}
