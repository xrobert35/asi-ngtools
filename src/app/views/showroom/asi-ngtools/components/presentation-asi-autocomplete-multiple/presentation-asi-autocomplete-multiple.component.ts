import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Referentiel } from './../presentation-asi-select/referentiel';
import { Component, HostBinding } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'presentation-asi-autocomplete-multiple',
  templateUrl: './presentation-asi-autocomplete-multiple.component.html',
})
export class PresentationAsiAutoCompleteMultipleComponent {

  @HostBinding('class') class = 'flex';

  data: Array<any> = [new Referentiel('Code1', 'Libelle1'),
  new Referentiel('Code2', 'Libelle2'),
  new Referentiel('Code3', 'Libelle3'),
  new Referentiel('Code4', 'Libelle4'),
  new Referentiel('Code5', 'Libelle5'),
  new Referentiel('Code6', 'Libelle6'),
  new Referentiel('Code7', 'Libelle7'),
  new Referentiel('Code8', 'Libelle8')];

  autoCompleteMultipleValue: any;

  ref = new Referentiel('Code2', 'Libelle');

  // Form declaration
  myFormMultiple: FormGroup;

  constructor(fb: FormBuilder) {
    this.myFormMultiple = fb.group({
      myModel: [null, Validators.required]
    });
  }

  /**
   * You can return a promise or an observable
   * if you use an observable request will be automatically
   * cancelled if another search request happen
   */
  requestData = (searchText: string, init: boolean) => {
    if (!init) {
      return of(this.data).pipe(map((data) => {
        return data.filter((item) => item.libelle.toLowerCase().includes(searchText.toLowerCase()));
      }));
    }
    return [];
  }
}
