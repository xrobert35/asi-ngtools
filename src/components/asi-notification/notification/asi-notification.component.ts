import { AsiNotificationType } from '../asi-notification-config';
import { AsiNotificationPosition, AsiNotificationConfig } from '../asi-notification-config';
import { Component, ViewContainerRef, HostBinding } from '@angular/core';

@Component({
  selector: 'asi-notification',
  templateUrl: './asi-notification.component.html',
})
export class AsiNotification<T> {

  @HostBinding('class') class = 'asi-component asi-notification';

  private _component: T;
  private _config: AsiNotificationConfig;

  icon: 'fa-exclamation' | 'fa-info' | 'fa-check' = 'fa-check';
  withIcon = false;

  constructor(public viewContainerRef: ViewContainerRef) {
  }

  getComponent(): T {
    return this._component;
  }

  setConfig(config: AsiNotificationConfig) {
    this._config = config;
    this.withIcon = config.withIcon;
    switch (config.type) {
      case AsiNotificationType.SUCCESS:
        this.icon = 'fa-check';
        break;
      case AsiNotificationType.INFO:
        this.icon = 'fa-info';
        break;
      case AsiNotificationType.WARNING:
      case AsiNotificationType.ERROR:
        this.icon = 'fa-exclamation';
        break;
    }
    this.updateClass();
  }

  getPosition(): AsiNotificationPosition {
    return this._config.position;
  }

  private updateClass() {
    this.class += ` ${this._config.position.toString()}`;
    this.class += ` ${this._config.type.toString()}`;
  }
}
