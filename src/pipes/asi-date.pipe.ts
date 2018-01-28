import { Pipe, PipeTransform } from "@angular/core";
import { AsiMomentService } from './../services/asi-moment.service';

@Pipe({ name: 'asiDate' })
export class AsiDatePipe implements PipeTransform {

  constructor(private asiMomentService: AsiMomentService) {
  }

  transform(date: Date, format: string) {
    return this.asiMomentService.formatDate(date, format);
  }
}