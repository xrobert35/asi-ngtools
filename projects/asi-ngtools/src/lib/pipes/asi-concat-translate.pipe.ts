import { TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';
import * as nh from '../native-helper';

 /**
 * Pipe allowing to concat items
 * items : items to concat
 * separator : a separator
 * base : translate base value
 * property : sub item property (if needed)
 */
@Pipe({
  name: 'asiConcatTranslate',
  pure: false
})
export class AsiConcatTranslatePipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  transform(items: Array<any>, separator: string, base?: string, property?: string) {
    if (nh.isEmpty(items)) {
      return '';
    }
    let itemsTranslate;
    if (property != null) {
      itemsTranslate = nh.map(items, (item) => {
        return this.translate.instant(base + item[property]);
      });
    } else {
      itemsTranslate = nh.map(items, (item) => {
        return this.translate.instant(base + item);
      });
    }
    return nh.join(itemsTranslate, separator);
  }
}
