import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Referentiel } from './../presentation-asi-select/referentiel';
import { Component, HostBinding } from '@angular/core';

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

  requestData = () => {
    return this.data;
  }
}
