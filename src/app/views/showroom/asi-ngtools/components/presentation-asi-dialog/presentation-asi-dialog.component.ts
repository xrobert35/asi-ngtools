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


    setTimeout(() => {
      let asiDialog2 = this.asiDialogService.fromComponent(DialogComponent, { class: 'presentation', over: true });
      asiDialog2.onDialogCancel().subscribe(() => {
        console.log('Cancel !!');
      });
      asiDialog2.onDialogClose().subscribe((item) => {
        console.log('Dialog close !!' + item);
      });

      asiDialog2.getComponent().message = 'My Dialog 2 ';
    }, 5000);

  }
}
