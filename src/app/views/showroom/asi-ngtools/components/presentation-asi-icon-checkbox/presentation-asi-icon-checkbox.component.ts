import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-icon-checkbox',
  templateUrl: './presentation-asi-icon-checkbox.component.html',
})
export class PresentationAsiIconCheckboxComponent {

  @HostBinding('class') class = 'flex';

  check: boolean;

  // Form declaration
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }
}
