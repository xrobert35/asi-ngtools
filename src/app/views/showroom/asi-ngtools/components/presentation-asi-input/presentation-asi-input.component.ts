import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-input',
  templateUrl: './presentation-asi-input.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiInputComponent {

  myForm: FormGroup;
  inputValue: string;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

  submit() {
  }
}
