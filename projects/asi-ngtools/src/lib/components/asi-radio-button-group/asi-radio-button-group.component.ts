import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { AsiRadioButtonComponent } from './asi-radio-button/asi-radio-button.component';
import {
  Input, Component, TemplateRef, ViewChild, ContentChildren, QueryList,
  forwardRef, OnInit, AfterContentInit, ElementRef, Renderer2
} from '@angular/core';

@Component({
  selector: 'asi-radio-button-group',
  templateUrl: 'asi-radio-button-group.component.html',
  host: { 'class': 'asi-component asi-radio-button-group' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiRadioButtonGroupComponent),
      multi: true
    }
  ]
})
export class AsiRadioButtonGroupComponent extends DefaultControlValueAccessor implements OnInit, AfterContentInit {

  @Input() label: string;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';
  @Input() vertical = false;
  @Input() trackBy: string = null;

  @ContentChildren(AsiRadioButtonComponent) queryRadios: QueryList<AsiRadioButtonComponent>;

  @ViewChild(TemplateRef) contentTemplate: TemplateRef<any>;

  radios = new Array<AsiRadioButtonComponent>();

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
    if (this.vertical) {
      this.renderer.addClass(this.elementRef.nativeElement, 'asi-vertical');
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
