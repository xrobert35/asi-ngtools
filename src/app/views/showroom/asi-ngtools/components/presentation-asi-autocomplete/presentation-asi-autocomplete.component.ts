import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Referentiel } from './../presentation-asi-select/referentiel';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-autocomplete',
  templateUrl: './presentation-asi-autocomplete.component.html',
})
export class PresentationAsiAutoCompleteComponent {

  @HostBinding('class') class = 'flex';

  datas: Array<any> = [];
  datasForm: Array<any> = [];

  datasMultiple: Array<any> = [];
  datasFormMultiple: Array<any> = [];

  autoCompleteValue: any;
  autoCompleteMultipleValue: any;

  ref = new Referentiel('Code2', 'Libelle');

  // Form declaration
  myForm: FormGroup;
  myFormMultiple: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
    this.myFormMultiple = fb.group({
      myModel: [null, Validators.required]
    });
  }

  requestData = () => {
    this.datas.push(this.ref);
    return this.datas;
  }

  requestDataForm = () => {
    this.datas.push(this.ref);
    return this.datas;
  }

  requestDataMultiple = () => {
    this.datasMultiple.push(this.ref);
    return this.datasMultiple;
  }

  requestDataFormMultiple = () => {
    this.datasMultiple.push(this.ref);
    return this.datasMultiple;
  }

}
