import { Injectable } from '@angular/core';

@Injectable()
export class AsiCssInjectorService {

  constructor() {
  }

  injectCss(cssUrl : string) {
    document.getElementsByTagName("head")[0].appendChild(this.getCssTemplate(cssUrl));
  }

  getCssTemplate(cssUrl: string) {
    var link = document.createElement("link");
    link.href = cssUrl;
    link.type = "text/css";
    link.rel = "stylesheet"
    return link
  }
}