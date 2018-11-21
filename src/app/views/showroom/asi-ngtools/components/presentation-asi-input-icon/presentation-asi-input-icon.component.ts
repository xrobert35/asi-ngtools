import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-input-icon',
  templateUrl: './presentation-asi-input-icon.component.html',
})
export class PresentationAsiInputIconComponent {

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

  showMenu() {
    console.log('Icon clicked!');
  }
}
