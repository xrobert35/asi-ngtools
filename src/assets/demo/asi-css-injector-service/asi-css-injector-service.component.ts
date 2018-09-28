import { Component } from '@angular/core';
import { AsiCssInjectorService } from '@asi-ngtools/lib';

@Component({
  selector: 'presentation-asicssinjector',
  templateUrl: './presentation-asicssinjector.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiCssInjectorComponent {

  constructor(private cssinjector: AsiCssInjectorService){
  }

  inject(){
    this.cssinjector.injectCss('../../assets/demo/asi-css-injector-service/css-injector.css');
  }
}