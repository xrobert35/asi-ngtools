import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'asi-ibanfr-input',
  templateUrl: 'asi-ibanfr-input.component.html',
  host: { 'class': 'asi-component asi-ibanfr-input' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiIbanFRInputComponent),
      multi: true
    }
  ]
})
export class AsiIbanFRInputComponent extends DefaultControlValueAccessor {

  @Input() label: string;
  @Input() placeholder: string = "";
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = "top";

  bank : string;
  branch : string;
  account : string;
  key : string;
  
  countryControl = new FormControl();


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    super();
    this.countryControl.valueChanges.subscribe((value: string) => {
      if (value == "") {
        console.log("value " + value);
      }
    });
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, "label-" + this.labelPosition);
  }
}