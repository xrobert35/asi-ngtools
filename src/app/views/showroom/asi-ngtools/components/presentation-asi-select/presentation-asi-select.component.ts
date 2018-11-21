import { Referentiel } from './referentiel';
import { Component, HostBinding } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'presentation-asi-select',
  templateUrl: './presentation-asi-select.component.html'
})
export class PresentationAsiSelectComponent {

  @HostBinding('class') class = 'flex';

  datas: Array<any> = [];
  selectValue: Referentiel = null;
  myModel: Referentiel;
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });

    this.datas.push(new Referentiel('Code1', 'Libelle code'));
    this.datas.push(new Referentiel('Code2', 'Libelle code2'));
    this.datas.push(new Referentiel('Code3', 'Libelle code3'));
    this.datas.push(new Referentiel('Code4', 'Libelle code4'));
    this.datas.push(new Referentiel('Code5', 'Libelle code5'));
    this.datas.push(new Referentiel('Code6', 'Libelle code6'));
  }

  submit() {
  }

  valueChange() {
  }
}
