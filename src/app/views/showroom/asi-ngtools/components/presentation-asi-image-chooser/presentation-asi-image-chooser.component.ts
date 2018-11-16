import { AsiFileService, AsiValidators } from '@asi-ngtools/lib';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-image-chooser',
  templateUrl: './presentation-asi-image-chooser.component.html',
})
export class PresentationAsiImageChooserComponent {

  @HostBinding('class') class = 'flex';

  myForm: FormGroup;

  constructor(fb: FormBuilder, private fileUtils: AsiFileService) {

    this.myForm = fb.group({
      myModel: [null, [Validators.required, AsiValidators.fileSize(2000000)]]
    });
  }

  imageSelect(file: File) {
    this.fileUtils.fileToBase64Data(file).subscribe((base64) => {
      console.log(base64);
    });
  }
}
