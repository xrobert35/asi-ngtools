import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Referentiel } from './../presentation/referentiel';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-autocomplete-multiple',
  templateUrl: './presentation-asi-autocomplete-multiple.component.html',
})
export class PresentationAsiAutoCompleteMultipleComponent {

  datasMultiple: Array<any> = [];
  datasFormMultiple: Array<any> = [];

  autoCompleteMultipleValue: any;

  ref = new Referentiel("Code2", "Libelle");

  //Form declaration
  myForm: FormGroup;
  myFormMultiple: FormGroup;

  constructor(fb: FormBuilder) {
    this.myFormMultiple = fb.group({
      myModel: [null, Validators.required]
    });
  }

  requestDataMultiple() {
    this.datasMultiple = this.datasMultiple.concat([this.ref]);
  }

  requestDataFormMultiple() {
    this.datasFormMultiple = this.datasMultiple.concat([this.ref]);
  }

}