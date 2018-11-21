import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-error-messages',
  templateUrl: './presentation-asi-error-messages.component.html',
})
export class PresentationAsiErrorMessagesComponent {

  @HostBinding('class') class = 'flex';

  myForm: FormGroup;

  constructor(fb: FormBuilder) {

    this.myForm = fb.group({
      myModel: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      myModel2: [null, [Validators.minLength(5), Validators.maxLength(10), Validators.email]]
    });
  }

  submit() {
  }
}
