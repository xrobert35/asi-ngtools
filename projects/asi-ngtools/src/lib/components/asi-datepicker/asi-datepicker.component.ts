import { AsiCalendarComponent } from './../asi-calendar/asi-calendar.component';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, ElementRef, OnInit, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';

import moment from 'moment';

@Component({
  selector: 'asi-datepicker',
  host: { 'class': 'asi-component asi-datepicker' },
  templateUrl: 'asi-datepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiDatePickerComponent),
      multi: true
    }
  ]
})
export class AsiDatePickerComponent extends DefaultControlValueAccessor implements OnInit, AfterViewInit {

  /** Label to display (is translated) */
  @Input() label: string;
  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';
  /** placeholder if not null else will be the date display pattern */
  @Input() placeholder = null;

  /** date display pattern */
  @Input() pattern = 'DD/MM/YYYY';

  /** min date available */
  @Input() minDate: Date;
  /** max date available */
  @Input() maxDate: Date;

  /** open automatically when the input is focused*/
  @Input() autoOpen = true;

  inputControl = new FormControl();

  @ViewChild('input') inputElement: ElementRef;
  @ViewChild('calendar') calendarElement: AsiCalendarComponent;

  dateValid = true;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
    if (this.placeholder == null) {
      this.placeholder = this.pattern.toLowerCase();
    }
  }

  ngAfterViewInit() {
    this.inputControl.valueChanges.subscribe((val) => {
      this.dateValid = true;
      if (val === '' || val == null) {
        this.value = null;
      } else {
        let momentTest = moment.utc(val, this.pattern);
        if (momentTest.isValid()) {
          if (val.length === this.pattern.length) {
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

  openCalendar() {
    if (this.autoOpen) {
      this.calendarElement.openCalendar();
    }
  }

  onDatePicked(date: Date) {
    let formattedValue = moment(date).format(this.pattern);
    this.inputControl.setValue(formattedValue);
  }

  writeValue(value: Date) {
    if (value != null) {
      let momentValue = moment.utc(value);
      this._value = momentValue.toDate();
      let formattedValue = momentValue.format(this.pattern);
      this.inputControl.setValue(formattedValue, { emitEvent: false });
    } else {
      this._value = value;
      this.inputControl.setValue(null, { emitEvent: false });
    }
  }
}
