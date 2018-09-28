import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-dmypicker',
  templateUrl: './presentation-asi-dmypicker.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiDmyPickerComponent {

  dmy: any;
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

  submit() {
  }
}