import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Referentiel } from './../presentation/referentiel';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-autocomplete',
  templateUrl: './presentation-asi-autocomplete.component.html',
})
export class PresentationAsiAutoCompleteComponent {

  datas: Array<any> = [];
  datasForm: Array<any> = [];

  autoCompleteValue: any;

  ref = new Referentiel('Code2', 'Libelle');

  // Form declaration
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

  // Use Arrow function else "this" would be the AsiAutoCompleteComponent
  requestData = () => {
    this.datas = this.datas.concat([this.ref]);
  }

  // Use Arrow function else "this" would be the AsiAutoCompleteComponent
  requestDataForm = () => {
    this.datasForm = this.datas.concat([this.ref]);
  }
}
