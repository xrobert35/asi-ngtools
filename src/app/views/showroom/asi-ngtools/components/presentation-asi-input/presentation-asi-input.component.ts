import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-input',
  templateUrl: './presentation-asi-input.component.html',
})
export class PresentationAsiInputComponent {

  @HostBinding('class') class = 'flex';

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
