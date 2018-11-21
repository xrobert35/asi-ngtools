import { Component, HostBinding } from '@angular/core';
import { Referentiel } from './../../components/presentation-asi-select/referentiel';


@Component({
  selector: 'presentation-asifilter',
  templateUrl: './presentation-asifilter.component.html',
})
export class PresentationAsiFilterComponent {

  @HostBinding('class') class = 'flex';

  ref1 = new Referentiel('1', 'Libelle');
  ref2 = new Referentiel('2', 'Libelle');
  ref3 = new Referentiel('3', 'Texte');
  ref4 = new Referentiel('4', 'Texte');
  myArray = [this.ref1, this.ref2, this.ref3, this.ref4];

  constructor() {
  }

  filterFct(item: any, value: any) {
    return item.code > value;
  }

}
