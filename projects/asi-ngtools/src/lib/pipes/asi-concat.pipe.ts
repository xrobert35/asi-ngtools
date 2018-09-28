import { Pipe, PipeTransform } from '@angular/core';
import * as nh from '../native-helper';

/**
 * Pipe allowing to concat items
 * items : items to concat
 * separator : a separator
 * property : sub item property (if needed)
 */
@Pipe({
  name: 'asiConcat',
  pure: false
})
export class AsiConcatPipe implements PipeTransform {

  transform(items: Array<any>, separator: string, property?: string) {
    if (nh.isEmpty(items)) {
      return '';
    }
    if (property != null) {
      let itemsProperties = nh.map(items, (item) => {
        return item[property];
      });
      return nh.join(itemsProperties, separator);
    }
    return nh.join(items, separator);
  }

}
