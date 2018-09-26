import { Pipe, PipeTransform } from "@angular/core";

/**
 * Pipe permettant de filter une liste d'information
 * value : valeur de reference pour le filtre
 * filter : peut être une fonction de filtrage ou une propriete de l'objet
 */
@Pipe({ name: 'asiFilter' })
export class AsiFilterPipe implements PipeTransform {

  transform(items: Array<any>, value: any, filter: any) {
    let result = [];
    if (items != null) {
      if (this.isFunction(filter)) {
        result = items.filter(item => { return filter(item, value); });
      } else if (value != null) {
        result = items.filter(item => { item[value].indexOf(value) !== -1 });
      }
    }
    return result;
  }

  isFunction(functionToCheck: Function) {
    let getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }
}