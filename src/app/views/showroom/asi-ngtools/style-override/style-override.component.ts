import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-style-override',
  templateUrl: './style-override.component.html',
})
export class StyleOverrideComponent {

  @HostBinding('class') class = 'page';

}
