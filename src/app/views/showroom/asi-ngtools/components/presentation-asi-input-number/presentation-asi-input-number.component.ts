import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-input-number',
  templateUrl: './presentation-asi-input-number.component.html',
})
export class PresentationAsiInputNumberComponent {

  @HostBinding('class') class = 'flex';

  myForm: FormGroup;
  inputValue = 0;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [0, Validators.required]
    });
  }

  submit() {
  }
}
