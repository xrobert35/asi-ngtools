import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-checkbox',
  templateUrl: './presentation-asi-checkbox.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiCheckboxComponent {

  check : boolean; 
  
  //Form declaration
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }
}