import { AsiValidators } from '@asi-ngtools/lib';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-email',
  templateUrl: './presentation-asi-email.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiEmailComponent {

  myForm: FormGroup;
  myEmail: string;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myFormControl: ['', AsiValidators.email]
    });
  }

  submit() {
  }
}