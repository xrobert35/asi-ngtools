import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Referentiel } from './../presentation-asi-select/referentiel';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-autocomplete',
  templateUrl: './presentation-asi-autocomplete.component.html',
})
export class PresentationAsiAutoCompleteComponent {

  @HostBinding('class') class = 'flex';

  data: Array<any> = [new Referentiel('Code1', 'Libelle1'),
  new Referentiel('Code2', 'Libelle2'),
  new Referentiel('Code3', 'Libelle3'),
  new Referentiel('Code4', 'Libelle4'),
  new Referentiel('Code5', 'Libelle5'),
  new Referentiel('Code6', 'Libelle6'),
  new Referentiel('Code7', 'Libelle7'),
  new Referentiel('Code8', 'Libelle8')];

  autoCompleteValue: any;

  // Form declaration
  myForm: FormGroup;

  search: string;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

  requestData = (searchText: string) => {
    this.search = searchText;
    return this.data;
  }
}
