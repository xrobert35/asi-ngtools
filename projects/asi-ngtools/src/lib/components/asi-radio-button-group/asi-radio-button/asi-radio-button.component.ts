import { Input, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'asi-radio-button',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class AsiRadioButtonComponent {

  @Input() value: any;

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  public active: boolean;
  public index: number;
}
