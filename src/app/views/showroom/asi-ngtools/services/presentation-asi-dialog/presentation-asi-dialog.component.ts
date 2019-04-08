import { DialogComponent } from './dialog-component/dialog.component';
import { AsiDialogService } from '@asi-ngtools/lib';
import { Component, HostBinding } from '@angular/core';

const _apiDoc = require('./asiDialog-api.json');

@Component({
  selector: 'presentation-asi-dialog',
  templateUrl: './presentation-asi-dialog.component.html',
})
export class PresentationAsiDialogComponent {

  @HostBinding('class') class = 'flex';

  public apiDoc = _apiDoc;

  constructor(private asiDialogService: AsiDialogService) {
  }

  showDialog() {
    let asiDialog = this.asiDialogService.fromComponent(DialogComponent, {
      class: 'presentation', // add a class to the dialog
      over: false, // is supposed to be displayed over another dialog (loading dialog for exemple)
      outsideDrop: true // close the dialog when click outside
    });
    asiDialog.onDialogCancel().subscribe(() => {
      console.log('Cancel !!');
    });
    asiDialog.onDialogClose().subscribe((item) => {
      console.log('Dialog close !!' + item);
    });

    asiDialog.getComponent().message = 'My Dialog';
  }
}
