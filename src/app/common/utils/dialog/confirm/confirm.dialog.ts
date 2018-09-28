import { AsiDialogView } from '@asi-ngtools/lib';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    templateUrl: 'confirm.dialog.html',
    host: { 'class': 'dialog' }
})
export class ConfirmDialog extends AsiDialogView {

    public title: string;
    public message: string;

    constructor() {
        super();
    }
}