import { Component } from '@angular/core';

@Component({
  selector: 'asi-ngtools-menu',
  templateUrl: './asi-ngtools-menu.component.html',
  host: { 'class': 'display-flex' }
})
export class AsiNgToolsMenuComponent {

  collapsed = true;
}
