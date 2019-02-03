import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input, Output, EventEmitter, ElementRef, Inject, PLATFORM_ID, OnChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as calendarConst from './asi-calendar-constants';
import * as nh from '../../native-helper';
import moment from 'moment';

@Component({
  selector: 'asi-calendar',
  templateUrl: 'asi-calendar.component.html',
  host: { 'class': 'asi-component asi-calendar' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiCalendarComponent),
      multi: true
    }
  ]
})
export class AsiCalendarComponent extends DefaultControlValueAccessor implements OnChanges {

  @Input() relativeTo: ElementRef;

  @Input() minDate: Date;
  @Input() maxDate: Date;

  private _disableDayOfWeek: number[];

  /** allow you to disable day of week exemple [disableDayOfWeek]="[1, 2]"" while disabled monday and tusday */
  @Input()
  set disableDayOfWeek(daysOfWeek) {
    if (!daysOfWeek) {
      this._disableDayOfWeek = [];
    } else if (nh.isArray(daysOfWeek)) {
      this._disableDayOfWeek = daysOfWeek;
    } else {
      this._disableDayOfWeek = [daysOfWeek];
    }
  }


  @Output() onDatePicked = new EventEmitter<Date>();

  days: Array<calendarConst.Day>;
  months: Array<calendarConst.Month>;
  years: Array<number>;

  selectedMonth: calendarConst.Month;
  selectedYear: number;
  selectedDay: calendarConst.DayItem;

  dayOfMonths: Array<calendarConst.DayItem>;

  open = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    super();
    if (this.isFr()) {
      this.days = calendarConst.days_fr;
      this.months = calendarConst.months_fr;
    } else {
      this.days = calendarConst.days_en;
      this.months = calendarConst.months_en;
    }
    this.initYears();
  }

  private isFr(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return navigator.language === 'fr' || navigator.language === 'fr-FR';
    } else {
      return false;
    }
  }

  ngOnChanges() {
    if (this.minDate) {
      this.minDate.setHours(0, 0, 0, 0);
    }
    if (this.maxDate) {
      this.maxDate.setHours(23, 59, 59, 999);
    }
    this.calculDays();
  }

  initYears() {
    let results = new Array<number>();
    let currentYear = new Date().getFullYear() + 1;
    for (let year = currentYear; year >= 1900; year--) {
      results.push(year);
    }
    this.years = results;
  }

  onDropdownClose() {
    this.open = false;
  }

  public openCalendar() {
    this.open = true;
  }

  public closeCalendar() {
    this.open = false;
  }

  onDaySelected(dayItem: calendarConst.DayItem) {
    this.selectedDay = new calendarConst.DayItem(dayItem.day, dayItem.month, dayItem.year, dayItem.date, 'selected enabled');
    this.value = dayItem.date;
    this.closeCalendar();
    this.calculDays();

    this.onDatePicked.emit(this.value);
  }

  onMonthSelected() {
    let date = new Date(this.selectedYear, this.selectedMonth.num - 1, this.selectedDay.day);
    this.value = date;
    this.calculDays();
    this.onDatePicked.emit(date);
  }

  onYearSelected() {
    let date = new Date(this.selectedYear, this.selectedMonth.num - 1, this.selectedDay.day);
    this.value = date;
    this.calculDays();
    this.onDatePicked.emit(date);
  }

  calculDays() {
    if (!this.selectedMonth || !this.selectedYear) {
      return
    }
    let month = this.selectedMonth.num - 1;
    let year = this.selectedYear;
    const result = [];
    let date = new Date(year, month, 1);

    let mondayDelta = 0;
    let day = date.getDay();
    if (day === 0) {
      mondayDelta = -6;
    } else {
      mondayDelta = -(day - 1);
    }

    date = moment(date).add(mondayDelta, 'days').toDate();

    let deltaMonth = date.getMonth();

    if (deltaMonth !== month) {
      // Before first day of the month
      while (date.getMonth() === deltaMonth) {
        if (date.getDate() === this.selectedDay.day
          && date.getMonth() + 1 === this.selectedDay.month
          && date.getFullYear() === this.selectedDay.year) {
          result.push(this.selectedDay);
        } else {
          result.push(new calendarConst.DayItem(date.getDate(), date.getMonth() + 1, date.getFullYear(), new Date(date), 'extra enabled'));
        }
        date.setDate(date.getDate() + 1);
      }
    }

    // Month dates
    while (date.getMonth() === month) {
      if (date.getDate() === this.selectedDay.day
        && date.getMonth() + 1 === this.selectedDay.month
        && date.getFullYear() === this.selectedDay.year) {
        result.push(this.selectedDay);
      } else {
        result.push(new calendarConst.DayItem(date.getDate(), date.getMonth() + 1, date.getFullYear(), new Date(date), 'enabled'));
      }
      date.setDate(date.getDate() + 1);
    }

    // Days of the last week
    while (date.getDay() !== 1) {
      if (date.getDate() === this.selectedDay.day
        && date.getMonth() + 1 === this.selectedDay.month
        && date.getFullYear() === this.selectedDay.year) {
        result.push(this.selectedDay);
      } else {
        result.push(new calendarConst.DayItem(date.getDate(), date.getMonth() + 1, date.getFullYear(), new Date(date), 'extra enabled'));
      }
      date.setDate(date.getDate() + 1);
    }

    this.dayOfMonths = result;

    this.manageDisabledDate();
  }

  private manageDisabledDate() {
    const dayOfWeekDisabled = !nh.isEmpty(this._disableDayOfWeek);

    if (this.dayOfMonths) {
      nh.forEach(this.dayOfMonths, (dayItem) => {
        if (this.minDate != null) {
          if (dayItem.date < this.minDate) {
            dayItem.class = 'disabled';
          }
        }
        if (this.maxDate != null) {
          if (dayItem.date > this.maxDate) {
            dayItem.class = 'disabled';
          }
        }
        if (dayOfWeekDisabled && this._disableDayOfWeek.includes(<number>dayItem.date.getDay())) {
          dayItem.class = 'disabled';
        }
      });
    }
  }

  writeValue(value: Date) {
    this._value = value;
    this.initToDate(value);
  }

  initToDate(value: Date) {
    if (value == null) {
      value = new Date();
    }
    this.selectedYear = value.getFullYear();

    let dateMonth = value.getMonth() + 1;
    this.selectedMonth = nh.find(this.months, (month) => {
      return month.num === dateMonth;
    });

    this.selectedDay = new calendarConst.DayItem(value.getDate(), this.selectedMonth.num,
      this.selectedYear, new Date(value), 'selected enabled');

    this.calculDays();
  }

  goNextMonth() {
    let nextMonthNum = this.selectedMonth.num + 1;
    if (nextMonthNum === 13) {
      nextMonthNum = 1;
      this.selectedYear = this.selectedYear + 1;
      if (this.years.indexOf(this.selectedYear) === -1) {
        this.years.push(this.selectedYear);
      }
    }
    this.selectedMonth = nh.find(this.months, (month) => {
      return month.num === nextMonthNum;
    });

    this.calculDays();
  }

  goPreviousMonth() {
    let nextMonthNum = this.selectedMonth.num - 1;
    if (nextMonthNum === 0) {
      nextMonthNum = 12;
      this.selectedYear = this.selectedYear - 1;
    }
    this.selectedMonth = nh.find(this.months, (month) => {
      return month.num === nextMonthNum;
    });

    this.calculDays();
  }
}
