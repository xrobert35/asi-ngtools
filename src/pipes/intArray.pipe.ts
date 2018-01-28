import { Pipe, PipeTransform } from "@angular/core";

/**
 * Pipe permettant de transformer un nombre en Array comprenant ce nombre ainsi que les autres le précedent
 * Exemple  : [innerHtml]="5 | toArray"
 */
@Pipe({ name: 'intArray' })
export class IntArrayPipe implements PipeTransform {

  transform(max: number, first?: number, step?: number, reverse?: boolean) {
    if (first == null) {
      first = 0;
    }
    if (step == null) {
      step = 1;
    }

    var results = [];
    if (!reverse) {
      let value = first;
      while (value <= max) {
        results.push(value);
        value = value + step;
      }
    } else {
      let value = max;
      while (value >= first) {
        results.push(value);
        value = value - step;
      }
    }
    return results;
  }
}