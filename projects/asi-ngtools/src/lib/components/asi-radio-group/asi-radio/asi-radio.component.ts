import { Input, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'asi-radio',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class AsiRadioComponent {

  /** Position of the template */
  @Input() templatePosition: 'left' | 'right' | 'top' | 'bottom' = 'right';

  /** Value of the radio button */
  @Input() value: any;

  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;

  public active: boolean;
  public index: number;
}
