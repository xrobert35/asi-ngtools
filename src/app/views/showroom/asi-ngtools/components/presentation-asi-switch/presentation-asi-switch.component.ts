import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-switch',
  templateUrl: './presentation-asi-switch.component.html',
})
export class PresentationAsiSwitchComponent {

  @HostBinding('class') class = 'flex';

  value: boolean;
  check: boolean;

  // Form declaration
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

}

