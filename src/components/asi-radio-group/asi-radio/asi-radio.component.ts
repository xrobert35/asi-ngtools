import { Input, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'asi-radio',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class AsiRadioComponent {

  @Input() templatePosition: 'left' | 'right' | 'top' | 'bottom' = 'right';
  @Input() value: any;

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  public active: boolean;
  public index: number;
}
