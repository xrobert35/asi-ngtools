import { AsiDialog } from './../dialog/asi-dialog.component';
import { Observable, Subject } from 'rxjs';
import { Component, ViewContainerRef, ComponentRef, AfterContentInit, ViewChild, HostBinding } from '@angular/core';

import * as lodash from 'lodash';

@Component({
  selector: 'asi-dialog-container',
  templateUrl: 'asi-dialog-container.component.html',
})
export class AsiDialogContainer implements AfterContentInit {

  @HostBinding('class') class = 'asi-component asi-dialog-container';

  dialogs: Array<ComponentRef<AsiDialog<any>>> = [];
  visibleDialog: ComponentRef<AsiDialog<any>>;

  @ViewChild('shadow') shadow: any;

  private subjectContainer: Subject<AsiDialogContainer> = new Subject();

  constructor(public viewContainerRef: ViewContainerRef) {
  }

  onContainerEmpty(): Observable<AsiDialogContainer> {
    return this.subjectContainer.asObservable();
  }

  addDialog(dialogRef: ComponentRef<AsiDialog<any>>) {
    this.dialogs.push(dialogRef);

    dialogRef.instance['_dialogDestroy'].subscribe(() => {
      this.removeDialog(dialogRef);
    });

    setTimeout(() => {
      if (this.visibleDialog) {
        this.visibleDialog.location.nativeElement.style.display = 'none';
      }
      this.visibleDialog = dialogRef;
      this.visibleDialog.location.nativeElement.style.display = 'block';
    }, 200);

  }

  removeDialog(dialogRef: ComponentRef<AsiDialog<any>>) {
    lodash.remove(this.dialogs, (dialog) => {
      return dialog.instance === dialogRef.instance;
    });

    dialogRef.destroy();

    if (this.dialogs.length === 0) {
      this.shadow.nativeElement.style.opacity = '0';
      setTimeout(() => {
        this.subjectContainer.next(this);
        this.subjectContainer.complete();
      }, 200);
    } else {
      this.visibleDialog = this.dialogs[this.dialogs.length - 1];
      this.visibleDialog.location.nativeElement.style.display = 'block';
    }
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.shadow.nativeElement.style.opacity = '0.5';
    }, 50);
  }
}
