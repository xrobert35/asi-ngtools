import { Injectable } from "@angular/core";

import * as moment from 'moment';

@Injectable()
export class AsiMomentService {

  constructor() {
  }

  addDays(date: Date, dayNumber: number): Date {
    if (date != null && dayNumber != null) {
      return moment(date).add(dayNumber, "days").toDate();
    } else {
      return null;
    }
  }

  addMonths(date: Date, monthNumber: number): Date {
    if (date != null && monthNumber != null) {
      return moment(date).add(monthNumber, "months").toDate();
    } else {
      return null;
    }
  }

  formatToLocalDate(date: any) : string {
    return this.format(date, 'YYYY-MM-DD', 'YYYY-MM-DD');
  }

  formatDate(date: any, pattern?: string) : string {
    return this.format(date, 'YYYY-MM-DD', pattern);
  }

  formatDateTime(date: any, pattern?: string) : string {
    return this.format(date, 'YYYY-MM-DDTHH:mm:ss:SSSZ', pattern);
  }

  format(date: any, baseFormat: string, pattern?: string) : string {
    if (!date) {
      return "";
    }
    if (!pattern) {
      pattern = "DD/MM/YYYY"
    }
    let aDate = date;
    if (typeof aDate == "string") {
      let amoment = moment(aDate, baseFormat);
      return amoment.format(pattern);
    }
    return moment(date).format(pattern);
  }

  parse(dateString: string, pattern?: string): any {
    if (dateString == null) {
      return null;
    }
    if (pattern == null) {
      return moment(dateString);
    }
    return moment(dateString, pattern);
  }
}