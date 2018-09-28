import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-input-icon',
  templateUrl: './presentation-asi-input-icon.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiInputIconComponent {

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
