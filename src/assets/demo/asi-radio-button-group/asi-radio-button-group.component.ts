import { Referentiel } from './../presentation-asi-select/referentiel';
import { Component, HostBinding, } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'presentation-asi-button-radio-group',
  templateUrl: './presentation-asi-radio-button-group.component.html',
})
export class PresentationAsiRadioButtonGroupComponent {

  @HostBinding('class') class = 'flex';

  myForm: FormGroup;
  model1 = new Referentiel('code1', 'libelle1');
  model2 = new Referentiel('code2', 'libelle2');
  model3 = new Referentiel('code3', 'libelle3');
  radioValue: Referentiel = this.model2;

  fcontrol1 = new Referentiel('code1', 'libelle1');
  fcontrol2 = new Referentiel('code2', 'libelle2');
  fcontrol3 = new Referentiel('code3', 'libelle3');
  fcRadioValue: Referentiel = this.fcontrol3;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      radios: [null, Validators.required]
    });
  }

  submitting() {
  }
}
