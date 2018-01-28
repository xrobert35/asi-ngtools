import { Directive, HostListener } from '@angular/core';

/**
 * Directive permettant d'eviter la propagation du click a l'element parent
 */
@Directive({
  selector: '[no-click-propagation]'
})
export class NoClickPropagration  {

  @HostListener('mousedown', ['$event'])
  onMousedown($event : MouseEvent) {
    $event.stopPropagation();
  }

  constructor() {
  }
}