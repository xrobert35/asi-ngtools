import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-tinymce',
  templateUrl: './presentation-asi-tinymce.component.html',
})
export class PresentationAsiTinyMCEComponent {

  @HostBinding('class') class = 'flex';

  content = '<p>jack</p>';

}
