import { AsiNotificationType } from '../asi-notification-config';
import { AsiNotificationPosition, AsiNotificationConfig } from '../asi-notification-config';
import { Component, ViewContainerRef, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'asi-notification',
  templateUrl: './asi-notification.component.html',
  host: { 'class': 'asi-component asi-notification' },
})
export class AsiNotification<T> {

  private _component: T;
  private _config: AsiNotificationConfig;

  icon: "fa-exclamation" | "fa-info" | "fa-check" = "fa-check";
  withIcon = false;

  constructor(public viewContainerRef: ViewContainerRef, private renderer: Renderer2, private element: ElementRef) {
  }

  getComponent(): T {
    return this._component;
  }

  setConfig(config: AsiNotificationConfig) {
    this._config = config;
    this.withIcon = config.withIcon;
    switch (config.type) {
      case AsiNotificationType.SUCCESS:
        this.icon = "fa-check";
        break;
      case AsiNotificationType.INFO:
        this.icon = "fa-info";
        break;
      case AsiNotificationType.WARNING:
      case AsiNotificationType.ERROR:
        this.icon = "fa-exclamation";
        break;
    }
    this.updateClass();
  }

  getPosition(): AsiNotificationPosition {
    return this._config.position;
  }

  private updateClass() {
    this.renderer.addClass(this.element.nativeElement, this._config.position.toString());
    this.renderer.addClass(this.element.nativeElement, this._config.type.toString());
  }
}