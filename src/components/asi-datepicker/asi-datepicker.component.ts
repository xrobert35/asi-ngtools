import { AsiCalendarComponent } from './../asi-calendar/asi-calendar.component';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';

import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'asi-datepicker',
  templateUrl: 'asi-datepicker.component.html',
  host: { 'class': 'asi-component asi-datepicker' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiDatePickerComponent),
      multi: true
    }
  ]
})
export class AsiDatePickerComponent extends DefaultControlValueAccessor {

  @Input() label : string;
  @Input() placeholder: string = "";
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = "top";

  @Input() pattern: string = "DD/MM/YYYY";

  @Input() minDate: Date;
  @Input() maxDate: Date;

  @Input() autoOpen : boolean = true;

  inputControl = new FormControl();

  @ViewChild("input") inputElement: ElementRef;
  @ViewChild("calendar") calendarElement : AsiCalendarComponent;

  dateValid = true;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    this.placeholder = this.pattern.toLowerCase();
    this.renderer.addClass(this.elementRef.nativeElement, "label-" + this.labelPosition);
  }

  ngAfterViewInit() {
    this.inputControl.valueChanges.subscribe((val) => {
      this.dateValid = true;
      if (val == "" || val == null) {
        this.value = null;
      } else {
        let momentTest = moment(val, this.pattern);
        if (momentTest.isValid()) {
          if (val.length == this.pattern.length) {
            this.value = momentTest.toDate();
          } else {
            this.value = null;
          }
        } else {
          this.value = null;
          this.dateValid = false;
        }
      }
    });
  }

  openCalendar(){
    if(this.autoOpen){
      this.calendarElement.openCalendar();
    }
  }

  onDatePicked(date: Date) {
    let formattedValue = moment(date).format(this.pattern);
    this.inputControl.setValue(formattedValue);
  }

  writeValue(value : Date) {
    if (value != null) {
      let momentValue = moment(value);
      this._value = momentValue.toDate();
      let formattedValue = momentValue.format(this.pattern);
      this.inputControl.setValue(formattedValue, { emitEvent: false });
    } else {
      this._value = value;
      this.inputControl.setValue(null, { emitEvent: false });
    }
  }
}