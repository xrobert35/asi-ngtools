import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-input-chips',
  templateUrl: './presentation-asi-input-chips.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiInputChipsComponent {

  myForm: FormGroup;
  inputValue = '';
  initialChips = ['Typescript', 'Java'];

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

  submit() {
  }
}
