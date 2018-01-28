import { TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from "@angular/core";
import * as lodash from "lodash";

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

  transform(items: Array<any>, separator: string, base? : string, property? : string) {
    if (lodash.isEmpty(items)) {
      return "";
    }
    if (property != null) {
      let itemsTranslate = lodash.map(items, (item) => {
        return this.translate.instant(base + item[property]);
      });
      return lodash.join(itemsTranslate, separator);
    }
    let itemsTranslate = lodash.map(items, (item) => {
      return this.translate.instant(base + item);
    });
    return lodash.join(itemsTranslate, separator);
  }

}