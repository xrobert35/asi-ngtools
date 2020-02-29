import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-switch',
  templateUrl: './presentation-asi-switch.component.html',
  host: { 'class': 'page' }
})
export class PresentationAsiSwitchComponent {

  value: boolean;
  check: boolean;

  //Form declaration
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

}

