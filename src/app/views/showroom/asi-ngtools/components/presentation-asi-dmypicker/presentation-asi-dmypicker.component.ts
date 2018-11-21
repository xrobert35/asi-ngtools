import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-dmypicker',
  templateUrl: './presentation-asi-dmypicker.component.html',
})
export class PresentationAsiDmyPickerComponent {

  @HostBinding('class') class = 'flex';

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
