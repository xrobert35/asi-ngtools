import { Component } from '@angular/core';
import { AsiMomentService } from '@asi-ngtools/lib';

@Component({
  selector: 'presentation-asimoment',
  templateUrl: './presentation-asimoment.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiMomentComponent {

  dateStr: string;
  pattern = 'DD/MM/YYYY';
  date: Date;

  constructor(private momentService: AsiMomentService) {}

  private format() {
    return this.momentService.formatDate(this.date);
  }

  private parseDate(event) {
    this.date = this.momentService.parse(this.dateStr, this.pattern);
  }

  addDay() {
    this.date = this.momentService.addDays(this.date, 1);
  }

  addMonth() {
    this.date = this.momentService.addMonths(this.date, 1);
  }

}