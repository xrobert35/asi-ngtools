import { Subject, Observable } from 'rxjs';
import { AsiDialogConfig } from './../asi-dialog-config';
import { Component, ViewContainerRef, HostBinding } from '@angular/core';

@Component({
  selector: 'asi-dialog',
  templateUrl: 'asi-dialog.component.html'
})
export class AsiDialog<T> {

  @HostBinding('class') class = 'asi-component asi-dialog';

  private _component: T;
  private _config: AsiDialogConfig;
  private _dialogDestroy: Subject<any> = new Subject();
  private dialogClose: Subject<any> = new Subject();
  private dialogCancel: Subject<any> = new Subject();

  constructor(public viewContainerRef: ViewContainerRef) {
  }

  getComponent(): T {
    return this._component;
  }

  setConfig(config: AsiDialogConfig) {
    this._config = config;
  }

  getConfig(): AsiDialogConfig {
    return this._config;
  }

  close(param?: any) {
    this.dialogClose.next(param);
    this.dialogClose.complete();

    this._dialogDestroy.next();
    this._dialogDestroy.complete();
  }

  cancel(param?: any) {
    this.dialogCancel.next(param);
    this.dialogCancel.complete();

    this._dialogDestroy.next();
    this._dialogDestroy.complete();
  }

  onDialogCancel(): Observable<any> {
    return this.dialogCancel.asObservable();
  }

  onDialogClose(): Observable<any> {
    return this.dialogClose.asObservable();
  }
}
