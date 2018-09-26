import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { AsiRadioComponent } from './asi-radio/asi-radio.component';
import {
  Input, Component, TemplateRef, ViewChild, ContentChildren, QueryList,
  forwardRef, HostBinding, OnInit, AfterContentInit
} from '@angular/core';

@Component({
  selector: 'asi-radio-group',
  templateUrl: 'asi-radio-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiRadioGroupComponent),
      multi: true
    }
  ]
})
export class AsiRadioGroupComponent extends DefaultControlValueAccessor implements OnInit, AfterContentInit {

  @HostBinding('class') class = 'asi-component asi-radio-group';

  @Input() label: string;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';
  @Input() vertical = false;
  @Input() trackBy: string = null;

  @ContentChildren(AsiRadioComponent) queryRadios: QueryList<AsiRadioComponent>;

  @ViewChild(TemplateRef) contentTemplate: TemplateRef<any>;

  radios = new Array<AsiRadioComponent>();

  constructor() {
    super();
  }

  ngOnInit() {
    this.class += ' label-' + this.labelPosition;
    if (this.vertical) {
      this.class += ' asi-vertical';
    }
  }

  getRadios() {
    return this.radios;
  }

  onRadioChecked(radioEvent: { index: number, value: boolean }) {
    if (radioEvent.value) {
      this.radios.forEach((radio) => {
        if (radio.index === radioEvent.index) {
          radio.active = true;
          this.value = radio.value;
        } else {
          radio.active = false;
        }
      });
    } else {
      this.radios.forEach((radio) => {
        radio.active = false;
      });
      this.value = null;
    }
  }

  ngAfterContentInit() {
    let index = -1;
    this.queryRadios.forEach(radio => {
      radio.index = ++index;
      this.radios.push(radio)
    });

    this.initValue(this.value);
  }

  writeValue(value: any) {
    this._value = value;
    this.initValue(value);
  }

  private initValue(value: any) {
    if (value == null) {
      this.radios.forEach((radio) => {
        radio.active = false;
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
