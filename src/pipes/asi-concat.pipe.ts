import { Pipe, PipeTransform } from "@angular/core";
import * as lodash from "lodash";

/**
 * Pipe permettant de concatener des informations
 * items : les items à concatener
 * separator : le separator
 * property : la property à extraire des items
 */
@Pipe({
  name: 'asiConcat',
  pure: false
})
export class AsiConcatPipe implements PipeTransform {

  transform(items: Array<any>, separator: string, property? : string) {
    if (lodash.isEmpty(items)) {
      return "";
    }
    if (property != null) {
      let itemsProperties = lodash.map(items, (item) => {
        return item[property];
      });
      return lodash.join(itemsProperties, separator);
    }
    return lodash.join(items, separator);
  }

}