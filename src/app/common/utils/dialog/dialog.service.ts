import { AsiDialogService, AsiDialog } from '@asi-ngtools/lib';
import { ConfirmDialog } from './confirm/confirm.dialog';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

    constructor(private asiDialogService: AsiDialogService) { }

    public openConfirmDialog(title: string, message: string): AsiDialog<ConfirmDialog> {
        let dialogRef = this.asiDialogService.fromComponent(ConfirmDialog, null);
        dialogRef.getComponent().title = title;
        dialogRef.getComponent().message = message;
        return dialogRef;
    }
}