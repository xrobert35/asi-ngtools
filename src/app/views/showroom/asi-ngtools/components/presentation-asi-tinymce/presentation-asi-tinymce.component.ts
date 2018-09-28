import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-tinymce',
  templateUrl: './presentation-asi-tinymce.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiTinyMCEComponent {

  content: string = "<p>jack</p>";

}