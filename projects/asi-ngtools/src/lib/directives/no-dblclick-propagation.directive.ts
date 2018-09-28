import { Directive, HostListener } from '@angular/core';

/**
 * Directive permettant d'eviter la propagation du doubleclick a l'element parent
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[no-dblclick-propagation]'
})
export class NoDblclickPropagration {

  @HostListener('dblclick', ['$event'])
  onMousedown($event: MouseEvent) {
    $event.stopPropagation();
  }

  constructor() {
  }
}
