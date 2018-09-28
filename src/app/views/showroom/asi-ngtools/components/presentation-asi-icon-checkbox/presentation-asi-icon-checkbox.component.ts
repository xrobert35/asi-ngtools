import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-icon-checkbox',
  templateUrl: './presentation-asi-icon-checkbox.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiIconCheckboxComponent {

  check : boolean;

  //Form declaration
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }
}
