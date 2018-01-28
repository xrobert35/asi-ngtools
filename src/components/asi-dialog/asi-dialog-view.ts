import { AsiDialog } from './dialog/asi-dialog.component';

export class AsiDialogView {

  dialog : AsiDialog<any>;

  registerDialog(asiDialog : AsiDialog<any>){
    this.dialog = asiDialog;
  }
}