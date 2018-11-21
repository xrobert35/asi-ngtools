import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-textarea',
  templateUrl: './presentation-asi-textarea.component.html',
})
export class PresentationAsiTextAreaComponent {

  @HostBinding('class') class = 'flex';

  myForm: FormGroup;
  textareaValue: string;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }
}
