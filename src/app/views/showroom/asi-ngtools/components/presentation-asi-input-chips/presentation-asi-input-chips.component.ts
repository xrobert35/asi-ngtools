import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-input-chips',
  templateUrl: './presentation-asi-input-chips.component.html',
})
export class PresentationAsiInputChipsComponent {

  @HostBinding('class') class = 'flex';

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
