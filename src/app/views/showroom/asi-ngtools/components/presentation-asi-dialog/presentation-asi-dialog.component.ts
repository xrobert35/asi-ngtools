import { DialogComponent } from './dialog-component/dialog.component';
import { AsiDialogService } from '@asi-ngtools/lib';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-dialog',
  templateUrl: './presentation-asi-dialog.component.html',
})
export class PresentationAsiDialogComponent {

  @HostBinding('class') class = 'flex';

  constructor(private asiDialogService: AsiDialogService) {
  }

  showDialog() {
    let asiDialog = this.asiDialogService.fromComponent(DialogComponent, { class: 'presentation' });
    asiDialog.onDialogCancel().subscribe(() => {
      console.log('Cancel !!');
    });
    asiDialog.onDialogClose().subscribe((item) => {
      console.log('Dialog close !!' + item);
    });

    asiDialog.getComponent().message = 'My Dialog';
  }
}
