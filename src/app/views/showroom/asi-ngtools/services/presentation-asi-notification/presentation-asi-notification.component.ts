import { AsiNotificationService, AsiNotificationPosition, AsiNotificationType } from '@asi-ngtools/lib';
import { NotificationComponent } from './notification-component/notification.component';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-notification',
  templateUrl: './presentation-asi-notification.component.html',
})
export class PresentationAsiNotificationComponent {

  @HostBinding('class') class = 'flex';

  delay = 4000;
  toastType: AsiNotificationType = AsiNotificationType.SUCCESS;
  types = [AsiNotificationType.SUCCESS, AsiNotificationType.INFO, AsiNotificationType.WARNING, AsiNotificationType.ERROR];

  constructor(private asiNotificationService: AsiNotificationService) {
  }

  showNotif_TopRight() {
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.TOP_RIGHT,
      type: this.toastType,
      delayInMs: this.delay,
      withIcon : true
    });
    asiNotificationTR.getComponent().message = 'Top Right';
  }

  showNotif_TopLeft() {
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.TOP_LEFT,
      type: this.toastType,
      delayInMs: this.delay,
      withIcon : true
    });
    asiNotificationTR.getComponent().message = 'Top Left';
  }

  showNotif_BottomRight() {
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.BOTTOM_RIGHT,
      type: this.toastType,
      delayInMs: this.delay,
      withIcon : true
    });
    asiNotificationTR.getComponent().message = 'Bottom Right';
  }

  showNotif_BottomLeft() {
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.BOTTOM_LEFT,
      type: this.toastType,
      delayInMs: this.delay,
      withIcon : true
    });
    asiNotificationTR.getComponent().message = 'Bottom Left';
  }

  showNotif_TopCenter() {
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.TOP_CENTER,
      type: this.toastType,
      delayInMs: this.delay,
      withIcon : true
    });
    asiNotificationTR.getComponent().message = 'TOP Center';
  }

  showNotif_BottomCenter() {
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.BOTTOM_CENTER,
      type: this.toastType,
      delayInMs: this.delay,
      withIcon : true
    });
    asiNotificationTR.getComponent().message = 'Bottom Center';
  }



}
