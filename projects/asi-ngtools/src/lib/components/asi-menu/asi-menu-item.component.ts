import { TemplateRef, Input, EventEmitter, Output, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'asi-menu-item',
  template : '<ng-template><ng-content></ng-content></ng-template>'
})
export class AsiMenuItem {

  /** routerLink directive parameter */
  @Input() routerLink: string;

  /** is enabled/disabled */
  @Input() disabled = false;

  /** Event emitted when menu item is clicked */
  @Output() onClick = new EventEmitter();

  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;

  emitClick($event: MouseEvent) {
    this.onClick.emit($event);
  }
}
