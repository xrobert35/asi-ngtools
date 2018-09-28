import { TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';
import * as nh from '../native-helper';

/**
 * Pipe permettant de concatener des informations
 * items : les items à concatener
 * separator : le separator
 * base : la base du translate (permet de gerer des enums par exemple)
 * property : la property à extraite des items
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
