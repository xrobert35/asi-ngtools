import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'asi-input-presentation',
  templateUrl: './asi-input-presentation.component.html'
})
export class AsiInputPresentationComponent {

  inputValue : string;

  //Form declaration
  myForm: FormGroup;

  constructor(fb: FormBuilder){
    this.myForm = fb.group({
      myModel : [null, Validators.required]
    });
  }
}
