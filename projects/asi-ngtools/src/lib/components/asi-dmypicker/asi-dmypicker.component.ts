import { Month } from './asi-dmypicker-constants';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { Component, forwardRef, Input, Inject, PLATFORM_ID, Injector, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import * as dmyConstants from './asi-dmypicker-constants';
import * as nh from '../../native-helper';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'asi-dmypicker',
  host: { 'class': 'asi-component asi-dmypicker' },
  templateUrl: './asi-dmypicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiDmyPickerComponent),
      multi: true
    }
  ]
})
export class AsiDmyPickerComponent extends DefaultControlValueAccessor implements OnInit {

  /** Label to display (is translated) */
  @Input() label: string;

  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  /** hide day list */
  @Input() dayHidden = false;

  day: number;
  month: Month;
  year: number;

  dayLabel: string;
  monthLabel: string;
  yearLabel: string;

  days: Array<Number> = [];
  months: Array<dmyConstants.Month> = [];
  years: Array<Number> = [];

  language: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private injector: Injector,
    private renderer: Renderer2, private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
    if (this.isFr()) {
      this.months = dmyConstants.months_fr;
      this.dayLabel = 'Jour';
      this.monthLabel = 'Mois';
      this.yearLabel = 'Annee';
    } else {
      this.months = dmyConstants.months_en;
      this.dayLabel = 'Day';
      this.monthLabel = 'Month';
      this.yearLabel = 'Year';
    }
    this.initDays();
    this.initYears();
  }

  private isFr(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return navigator.language === 'fr' || navigator.language === 'fr-FR';
    } else {

      const request = this.injector.get('request');
      if (request && request.asiNgtools) {
        const language = request.asiNgtools.language;
        if (language) {
          return language.substring(0, 2) === 'fr';
        }
      }
      return false;
    }
  }

  initDays() {
    nh.times(31, (time) => {
      this.days.push(time + 1);
    });
  }

  initYears() {
    let results = new Array<number>();
    let currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      results.push(year);
    }
    this.years = results;
  }

  public onMonthChange(month: Month): void {
    this.value = { day: this.day, month: month != null ? month.num : null, year: this.year };
  }

  public onYearChange(year: number): void {
    this.value = { day: this.day, month: this.month != null ? this.month.num : null, year: year };
  }

  public onDayChange(day: number): void {
    this.value = { day: day, month: this.month != null ? this.month.num : null, year: this.year };
  }

  // Controle value accessor
  writeValue(value: any) {
    if (value != null) {
      this.day = value.day;
      this.month = this.getMontFromNum(value.month);
      this.year = value.year;
    } else {
      this.day = null;
      this.month = null;
      this.year = null;
    }
    this._value = { day: this.day, month: this.month, year: this.year };
  }

  private getMontFromNum(monthNum: number): Month {
    if (monthNum == null) {
      return null;
    }
    return nh.find(this.months, (month) => {
      return month.num === monthNum;
    });
  }
}
