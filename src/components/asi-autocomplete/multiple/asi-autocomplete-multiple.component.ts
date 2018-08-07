import {
  Component, Input, forwardRef, OnInit, ElementRef, ContentChild,
  ViewChild, OnChanges, HostBinding, Renderer2
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { DefaultControlValueAccessor } from './../../common/default-control-value-accessor';
import { AsiComponentTemplateOptionDef, AsiComponentTemplateTagDef } from './../../common/asi-component-template';
import * as lodash from 'lodash';
import { debounceTime } from 'rxjs/operators';

/**
 * asi-autocomplete-multiple component
 */
@Component({
  selector: 'asi-autocomplete-multiple',
  templateUrl: 'asi-autocomplete-multiple.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiAutoCompleteMultipleComponent),
      multi: true
    }
  ]
})
export class AsiAutoCompleteMultipleComponent extends DefaultControlValueAccessor implements OnInit, OnChanges {

  @HostBinding('class') class = 'asi-component asi-autocomplete-multiple';

  /** Label to display */
  @Input() label: string;

  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  @Input() placeholder = '';

  /** Delay between the moment you stop typing and dropdown is display */
  @Input() delay = 500;

  /** Data to display in the dropdown : change input reference to make it display */
  @Input() data: Array<any>;

  /** Option to keep the list open once an item is selected */
  @Input() closeAfterSelect = false;

  /** Event emitted to request new data when delay is past */
  @Input() onRequestData: Function;

  @ContentChild(AsiComponentTemplateOptionDef) optionDef: AsiComponentTemplateOptionDef;
  @ContentChild(AsiComponentTemplateTagDef) tagDef: AsiComponentTemplateTagDef;

  @ViewChild('container') container: ElementRef;

  autoCompleteControl = new FormControl();
  open = false;

  // Var used to manage component initialization
  firstRequestDone: Boolean = null;
  init = false;

  private currentValue: any = null;

  constructor(private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    this.renderer.addClass(this.container.nativeElement, 'label-' + this.labelPosition);
    this.autoCompleteControl.valueChanges.pipe(debounceTime(this.delay))
      .subscribe(value => {
        this.currentValue = value;
        if (this.onRequestData) {
          Promise.resolve(this.onRequestData(value)).then((data) => {
            this.data = data;
            if (this.firstRequestDone) {
              this.open = true;
            }
            this.firstRequestDone = true;
          });
        }
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
    lodash.remove(this.value, (value) => {
      return data === value;
    });

    if (lodash.isEmpty(this.value)) {
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
