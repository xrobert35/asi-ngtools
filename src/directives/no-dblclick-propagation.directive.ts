import { Directive, HostListener } from '@angular/core';

/**
 * Directive permettant d'eviter la propagation du doubleclick a l'element parent
 */
@Directive({
  selector: '[no-dblclick-propagation]'
})
export class NoDblclickPropagration  {

  @HostListener('dblclick', ['$event'])
  onMousedown($event : MouseEvent) {
    $event.stopPropagation();
  }

  constructor() {
  }
}