import { Component, HostBinding } from '@angular/core';
import { AsiCssInjectorService } from '@asi-ngtools/lib';

@Component({
  selector: 'presentation-asicssinjector',
  templateUrl: './presentation-asicssinjector.component.html',
})
export class PresentationAsiCssInjectorComponent {

  @HostBinding('class') class = 'flex';

  constructor(private cssinjector: AsiCssInjectorService) {
  }

  inject() {
    this.cssinjector.injectCss('../../assets/demo/asi-css-injector-service/css-injector.css');
  }
}
