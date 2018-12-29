import { DialogComponent } from './dialog.component';
import { AsiDialogService } from '@asi-ngtools/lib';
import { Component } from '@angular/core';

@Component({
  selector: 'asi-dialog-test',
  templateUrl: './asi-dialog-test.component.html',
})
export class AsiDialogTestComponent {

  constructor(private asiDialogService: AsiDialogService) {
  }

  showDialog() {
    let asiDialog = this.asiDialogService.fromComponent(DialogComponent, {
      class: 'presentation', // add a class to the dialog
      over: false // is supposed to be displayed over another dialog (loading dialog for exemple)
    });
    asiDialog.onDialogCancel().subscribe(() => {
      console.log('Cancel !!');
    });
    asiDialog.onDialogClose().subscribe((item) => {
      console.log('Dialog close !!' + item);
    });

    asiDialog.getComponent().message = 'My dialog';
  }
}
