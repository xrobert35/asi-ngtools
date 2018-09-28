import { TestBed, inject } from '@angular/core/testing';

import { ApiFunctionAsHTMLService } from './apiFunctionAsHTMLService.service';

describe('ApiFunctionAsHTMLService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiFunctionAsHTMLService]
    });
  });

  it('should parse in html a simple function',
    inject([ApiFunctionAsHTMLService], (fctAsHtmlService: ApiFunctionAsHTMLService) => {
      expect(fctAsHtmlService).toBeTruthy();
      const goodFct = 'test(param1: string, param2: boolean): ReturnType';
      const goodFctHTML = fctAsHtmlService.parseFunctionStringToHtml(goodFct);
      const expectedResult = {
        functionName: 'test',
        htmlSignature: '<span class="keyword">test</span>' +
        '<span class="char">(</span>' +
        '<span class="variable">param1</span>' +
        '<span class="char">: </span>' +
        '<span class="type">string</span>' +
        '<span class="char">, </span>' +
        '<span class="variable">param2</span>' +
        '<span class="char">: </span>' +
        '<span class="type">boolean</span>' +
        '<span class="char">): </span>' +
        '<span class="type">ReturnType</span>'
      };
      expect(goodFctHTML).toEqual(expectedResult);
  }));

  it('should parse in html a complexe function',
    inject([ApiFunctionAsHTMLService], (fctAsHtmlService: ApiFunctionAsHTMLService) => {
      expect(fctAsHtmlService).toBeTruthy();
      const goodComplexeFct = 'test(param1: string, param2?: boolean, param3: MyType): ReturnType<string>';
      const goodComplexeFctHTML = fctAsHtmlService.parseFunctionStringToHtml(goodComplexeFct);
      const expectedResult = {
        functionName: 'test',
        htmlSignature: '<span class="keyword">test</span>' +
        '<span class="char">(</span>' +
        '<span class="variable">param1</span>' +
        '<span class="char">: </span>' +
        '<span class="type">string</span>' +
        '<span class="char">, </span>' +
        '<span class="variable">param2?</span>' +
        '<span class="char">: </span>' +
        '<span class="type">boolean</span>' +
        '<span class="char">, </span>' +
        '<span class="variable">param3</span>' +
        '<span class="char">: </span>' +
        '<span class="type">MyType</span>' +
        '<span class="char">): </span>' +
        '<span class="type">ReturnType</span>' +
        '<span class="char"><</span>' +
        '<span class="type">string</span>' +
        '<span class="char">></span>'
      };
      expect(goodComplexeFctHTML).toEqual(expectedResult);
  }));

  it('should parse in html a function with parameter no type',
    inject([ApiFunctionAsHTMLService], (fctAsHtmlService: ApiFunctionAsHTMLService) => {
      expect(fctAsHtmlService).toBeTruthy();
      const goodFctNameParamNoType = 'test(paramNoType): string';
      const expectedResult = {
        functionName: 'test',
        htmlSignature: '<span class="keyword">test</span>' +
        '<span class="char">(</span>' +
        '<span class="variable">paramNoType</span>' +
        '<span class="char">: </span>' +
        '<span class="type">any</span>' +
        '<span class="char">): </span>' +
        '<span class="type">string</span>'
      };
      const goodFctNameParamNoTypeHTML = fctAsHtmlService.parseFunctionStringToHtml(goodFctNameParamNoType);
      expect(goodFctNameParamNoTypeHTML).toEqual(expectedResult);
  }));

  it('should raise an error when parsing a bad formatted string',
    inject([ApiFunctionAsHTMLService], (fctAsHtmlService: ApiFunctionAsHTMLService) => {
      expect(fctAsHtmlService).toBeTruthy();
      const goodComplexeFctName = 'im not a function string';
      const expectedResult = 'Can\'t parse function correctly: "im not a function string"';
      expect(function() {
        fctAsHtmlService.parseFunctionStringToHtml(goodComplexeFctName);
      }).toThrowError(expectedResult);
  }));
});
