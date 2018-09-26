import { TemplateRef, Input, EventEmitter, Output, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'asi-menu-item',
  template : '<ng-template><ng-content></ng-content></ng-template>'
})
export class AsiMenuItem {

  @Input() routerLink: string;
  @Input() disabled: Boolean = false;

  @Output() onClick = new EventEmitter();

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  emitClick($event: MouseEvent) {
    this.onClick.emit($event);
  }
}
