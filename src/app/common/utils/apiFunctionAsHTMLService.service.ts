import { Injectable } from '@angular/core';

export interface ParsedFunction {
  functionName: string;
  parameters: {
    variable: string,
    type: string,
  }[];
  returnType: {
    mainType: string,
    genericType: string
  };
}

export interface HTMLFunction {
  functionName: string;
  htmlSignature: string;
}

@Injectable()
export class ApiFunctionAsHTMLService {

  /**
   * Parse a function string into a ParsedFunction object
   * @param {string} fctString The function signature as a string
   * @return {ParsedFunction} Return an object representing the function values
   */
  public divideFunctionInValues(fctString: string): ParsedFunction {
    if ( !fctString ) {
      throw new Error('Please provide a function signature in parameters');
    }

    const fctNameAndReturnRegex = /^(\w+)\((.*)\):(\w*)(?:<(.*)>)?$/g;
    const parametersRegex = /^([\w?]+?)(?:\:(\w+))?$/;
    // Remove all spaces in the string
    const trimFctString = fctString.replace(/ /g, '');
    const array = fctNameAndReturnRegex.exec(trimFctString);
    if (!array) {
      throw new Error(`Can't parse function correctly: "${fctString}"`);
    }
    // The function name
    const fctName = array[1];
    // The return type as mainType<genericType>
    const rtnType = {
      mainType: array[3],
      genericType: array[4] // returns undefined if there is no generic type
    };
    // Split the matched parameters string into pairs of <param, type>
    const parameters = array[2].split(',').map((param) => {
      const regexParamRes = parametersRegex.exec(param);
      if (!regexParamRes) {
        throw new Error('Can\'t parse function parameters correctly.');
      }
      // For each parameter we have its name and type
      const variable = regexParamRes[1];
      let type = regexParamRes[2];
      if (!variable) {
        throw new Error('Can\'t parse function parameters correctly.');
      }
      // If no type is provided, we consider it as 'any'
      if (!type) {
        type = 'any';
      }
      return {
        variable,
        type,
      };
    });

    const parsedFunction: ParsedFunction = {
      functionName: fctName,
      returnType: rtnType,
      parameters,
    };

    return parsedFunction;
  }

  /**
   * Parse a function string into html view
   * @param fctString A function signature as string
   */
  public parseFunctionStringToHtml(fctString: string): HTMLFunction {
    const parsedFunction = this.divideFunctionInValues(fctString);
    const htmlFunction: string[] = [];
    // Push function name
    htmlFunction.push(
      `<span class="keyword">${parsedFunction.functionName}</span>`,
      '<span class="char">(</span>'
    );
    // Push parameters
    parsedFunction.parameters.forEach((param: any, index: number) => {
      if (index > 0) {
        htmlFunction.push('<span class="char">, </span>');
      }
      htmlFunction.push(
        `<span class="variable">${param.variable}</span>`,
        '<span class="char">: </span>',
        `<span class="type">${param.type}</span>`,
      );
    });
    // Push return type
    htmlFunction.push(
      '<span class="char">): </span>',
      `<span class="type">${parsedFunction.returnType.mainType}</span>`,
    );
    if (parsedFunction.returnType.genericType) {
      htmlFunction.push(
        '<span class="char">\<</span>',
        `<span class="type">${parsedFunction.returnType.genericType}</span>`,
        '<span class="char">\></span>',
      );
    }
    return {
      functionName: parsedFunction.functionName,
      htmlSignature: htmlFunction.join('')
    };
  }

}
