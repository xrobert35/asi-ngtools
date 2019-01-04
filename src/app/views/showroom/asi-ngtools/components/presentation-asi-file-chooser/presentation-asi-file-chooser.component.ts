import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';
import { AsiMimeType } from 'projects/asi-ngtools/src/public_api';

@Component({
  selector: 'presentation-asi-file-chooser',
  templateUrl: './presentation-asi-file-chooser.component.html'
})
export class PresentationAsiFileChooserComponent {

  @HostBinding('class') class = 'flex';

  myForm: FormGroup;

  pdfMimeType = AsiMimeType.PDF;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

  fileSelected(file: File) {
    console.log('File chosen: ' + file.name);
  }
}
