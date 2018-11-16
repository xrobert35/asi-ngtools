import { DialogComponent } from './dialog-component/dialog.component';
import { AsiDialogService } from '@asi-ngtools/lib';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-dialog',
  templateUrl: './presentation-asi-dialog.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiDialogComponent {

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
