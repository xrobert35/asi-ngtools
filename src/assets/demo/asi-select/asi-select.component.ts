import { Referentiel } from './referentiel';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'asi-select-presentation',
  templateUrl: './asi-select-presentation.component.html'
})
export class AsiSelectPresentationComponent {

  datas : Array<Referentiel> = [];
  selectValue : Referentiel;

  //Form declaration
  myForm: FormGroup;

  constructor(fb: FormBuilder){
    this.myForm = fb.group({
      myModel : [null, Validators.required]
    });

    this.datas.push(new Referentiel("Code1", "Libelle code1"));
    this.datas.push(new Referentiel("Code2", "Libelle code2"));
    this.datas.push(new Referentiel("Code3", "Libelle code3"));
    this.datas.push(new Referentiel("Code4", "Libelle code4"));
    this.datas.push(new Referentiel("Code5", "Libelle code5"));
    this.datas.push(new Referentiel("Code6", "Libelle code6"));
  }
}
