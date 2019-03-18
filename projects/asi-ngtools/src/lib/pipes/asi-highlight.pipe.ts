import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from '../native-helper';

@Pipe({ name: 'asiHighligh' })
export class AsiHighlighPipe implements PipeTransform {
  constructor() {
  }
  transform(text: string, toHighlight: string) {
    if (!isEmpty(text) && !isEmpty(toHighlight)) {
      let pos = 0;
      let debut = 0;

      // lower case and normalize
      const rechercheNormalisee = toHighlight.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
      const outputNormalise = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();

      let highlightedOutput = '';
      while (pos !== -1) {
        pos = outputNormalise.indexOf(rechercheNormalisee, debut);
        if (pos !== -1) {
          highlightedOutput += text.slice(debut, pos) +
            '<span class="highlight">' + text.slice(pos, pos + toHighlight.length) + '</span>';
          debut = pos + rechercheNormalisee.length;
        }
      }
      highlightedOutput += text.slice(debut);
      text = highlightedOutput;
    }
    return text;
  }
}
