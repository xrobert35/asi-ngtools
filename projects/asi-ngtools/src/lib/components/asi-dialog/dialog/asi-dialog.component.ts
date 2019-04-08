import { Subject, Observable } from 'rxjs';
import { AsiDialogConfig } from './../asi-dialog-config';
import { Component, ViewContainerRef, HostBinding, HostListener, ElementRef } from '@angular/core';

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

  constructor(public viewContainerRef: ViewContainerRef, private elementRef: ElementRef) {
  }

  getComponent(): T {
    return this._component;
  }

  setConfig(config: AsiDialogConfig) {
    this._config = config || new AsiDialogConfig();
    if (this._config.class) {
      this.class += ' ' + this._config.class;
    }
  }

  getConfig(): AsiDialogConfig {
    return this._config;
  }

  close(param?: any) {
    this.dialogClose.next(param);
    this.dialogClose.complete();

    // notify the container
    this._dialogDestroy.next();
    this._dialogDestroy.complete();
  }

  cancel(param?: any) {
    this.dialogCancel.next(param);
    this.dialogCancel.complete();

    this._dialogDestroy.next();
    this._dialogDestroy.complete();
  }

  @HostListener('document:mouseup', ['$event'])
  documentClick(event: MouseEvent) {
    if (this._config.outsideDrop) {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.close();
      }
    }
  }

  onDialogCancel(): Observable<any> {
    return this.dialogCancel.asObservable();
  }

  onDialogClose(): Observable<any> {
    return this.dialogClose.asObservable();
  }
}
