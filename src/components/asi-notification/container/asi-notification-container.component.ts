import { Observable, Subject } from 'rxjs';
import { AsiNotification } from '../notification/asi-notification.component';
import { AsiNotificationPosition, AsiNotificationConfig } from '../asi-notification-config';
import { Component, ViewContainerRef, Renderer2, ElementRef, ComponentRef } from '@angular/core';

import * as lodash from 'lodash';

@Component({
  selector: 'asi-notification-container',
  templateUrl: 'asi-notification-container.component.html',
  host: { 'class': 'asi-component asi-notification-container' },
})
export class AsiNotificationContainer {

  private _position: AsiNotificationPosition;
  private subjectContainer: Subject<AsiNotificationContainer> = new Subject();

  notifications: Array<ComponentRef<AsiNotification<any>>> = [];

  constructor(public viewContainerRef: ViewContainerRef, private renderer: Renderer2, private element: ElementRef) {
  }

  setPosition(position: AsiNotificationPosition) {
    this._position = position;
    this.updateClass();
  }

  getPosition() {
    return this._position;
  }

  private updateClass() {
    this.renderer.addClass(this.element.nativeElement, this._position.toString());
  }

  onContainerEmpty(): Observable<AsiNotificationContainer> {
    return this.subjectContainer.asObservable();
  }

  addNotification(componentRef: ComponentRef<AsiNotification<any>>, config: AsiNotificationConfig) {
    this.notifications.unshift(componentRef);
    setTimeout(() => {
      this.updatePosition();
    }, 5);
    if (config.delayInMs != null && config.delayInMs > 0) {
      setTimeout(() => {
        this.removeNotification(componentRef);
      }, config.delayInMs);
    }
  }

  removeNotification(componentRef: ComponentRef<AsiNotification<any>>) {
    componentRef.location.nativeElement.style.opacity = "0";

    setTimeout(() => {
      lodash.remove(this.notifications, (notif) => {
        return notif.instance == componentRef.instance;
      });
      this.updatePosition();
      componentRef.destroy();
      if (this.notifications.length == 0) {
        this.subjectContainer.next(this);
        this.subjectContainer.complete();
      }
    }, 300);

  }

  updatePosition() {
    let top = this._position.value.startsWith("top")

    let position: number = 0;
    let notifHeight;
    this.notifications.forEach(notification => {
      notifHeight = notification.location.nativeElement.offsetHeight;
      let pos = (position * notifHeight + (5 * position)) + "px";
      if (top) {
        notification.location.nativeElement.style.top = pos;
      } else {
        notification.location.nativeElement.style.bottom = pos;
      }
      position++;
    })
  }
}