import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-file-chooser',
  templateUrl: './presentation-asi-file-chooser.component.html'
})
export class PresentationAsiFileChooserComponent {

  @HostBinding('class') class = 'flex';

  myForm: FormGroup;

  constructor(fb: FormBuilder) {

    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

  fileSelected(file: File) {
    console.log('File chosen: ' + file.name);
  }
}
