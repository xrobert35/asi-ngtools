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

  ref = new Referentiel("Code2", "Libelle");

  //Form declaration
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

  requestData() {
    this.datas = this.datas.concat([this.ref]);
  }

  requestDataForm() {
    this.datasForm = this.datas.concat([this.ref]);
  }

}