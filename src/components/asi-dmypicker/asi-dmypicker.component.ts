import { Month } from './asi-dmypicker-constants';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { Component, ElementRef, forwardRef, Input, Renderer2 } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import * as dmyConstants from "./asi-dmypicker-constants";
import * as lodash from "lodash";

@Component({
    selector: 'asi-dmypicker',
    templateUrl: './asi-dmypicker.component.html',
    host: { 'class': 'asi-component asi-dmypicker' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AsiDmyPickerComponent),
            multi: true
        }
    ]
})
export class AsiDmyPickerComponent extends DefaultControlValueAccessor {

    @Input() label: string;
    @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = "top";

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

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        super();
        if (this.isFr()) {
            this.months = dmyConstants.months_fr;
            this.dayLabel = "Jour";
            this.monthLabel = "Mois";
            this.yearLabel = "Annee";
        } else {
            this.months = dmyConstants.months_en;
            this.dayLabel = "Day";
            this.monthLabel = "Month";
            this.yearLabel = "Year";
        }
        this.initDays();
        this.initYears();
    }

    private isFr(): boolean {
        return navigator.language == "fr" || navigator.language == "fr-FR";
    }

    initDays(){
        lodash.times(31 , (time) => {
            this.days.push(time+1);    
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

    ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, "label-" + this.labelPosition);
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

    //Controle value accessor
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
        return lodash.find(this.months, (month) => {
            return month.num == monthNum;
        });
    }
}