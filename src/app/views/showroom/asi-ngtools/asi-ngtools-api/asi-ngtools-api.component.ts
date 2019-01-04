import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { ApiFunctionAsHTMLService } from '@common/utils/apiFunctionAsHTMLService.service';

export interface ApiFunctionsData {
  functionName: string;
  description: string;
  parameters: Array<FunctionParameter>;
  return?: FunctionParameter;
  htmlSignature?: string;
}

export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    typeLink?: string;
}

/**
 * This component should only be used inside 'api' tabs of services documentation.
 * You must provide a json description file which describes the available service's functions.
 * This json contains a summary and array of function:
 * {
 *   "summary": "<service summary>",
 *   "functionsDoc": [<see the following function json object>]
 * }
 *
 * Each function is described as following:
 * {
 *   "functionName": "<the string of the function signature>",
 *   "description": "<the function description>",
 *   "parameters": [{
 *       "name": "<parameter name>",
 *       "type": "<parameter type>",
 *       "description": "<parameter description>",
 *       "typeLink": "<optional link to type documentation>"
 *     }
 *   ],
 *   "return": {
 *     "name": "return",
 *     "type": "<return type>",
 *     "description": "<return description>"
 *   }
 * }
 */
@Component({
  selector: 'app-asi-ngtools-api',
  templateUrl: './asi-ngtools-api.component.html',
})
export class AsiNgToolsApiComponent implements OnInit {

  @HostBinding('class.display-flex')

  @Input()
  public functions: Array<ApiFunctionsData>;
  @Input()
  public summary: string;
  public fcts = new Array<ApiFunctionsData>();

  constructor(private fctToHtml: ApiFunctionAsHTMLService) { }

  ngOnInit() {
    this.functions.forEach((fct: any) => {
      const parsedFct = this.fctToHtml.parseFunctionStringToHtml(fct.functionName);
      fct.displayFunctionName = parsedFct.functionName;
      fct.displayHtmlSignature = parsedFct.htmlSignature;
      this.fcts.push(fct);
    });
  }

  trackByFctName(_index: number, item: {description: string, functionName: string, htmlSignature: string}) {
    return item.functionName;
  }
}
