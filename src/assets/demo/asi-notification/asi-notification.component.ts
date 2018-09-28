import { AsiNotificationService, AsiNotificationPosition, AsiNotificationType } from '@asi-ngtools/lib';
import { NotificationComponent } from './notification-component/notification.component';
import { Component } from '@angular/core';

@Component({
  selector: 'asi-notification-presentation',
  templateUrl: './asi-notification-presentation.component.html'
})
export class AsiNotificationPresentationComponent {

  constructor(private asiNotificationService: AsiNotificationService) {
  }

  showNotif_TopRight() {
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.TOP_RIGHT,
      type: AsiNotificationType.SUCCESS,
      delayInMs: 4000,
      withIcon : true
    });
    asiNotificationTR.getComponent().message = "Top Right";
  }

  showNotif_TopLeft() {
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.TOP_LEFT,
      type: AsiNotificationType.WARNING,
      delayInMs: 4000,
      withIcon : true
    });
    asiNotificationTR.getComponent().message = "Top Left";
  }

  showNotif_BottomRight() {
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.BOTTOM_RIGHT,
      type: AsiNotificationType.SUCCESS,
      delayInMs: 4000,
      withIcon : true
    });
    asiNotificationTR.getComponent().message = "Bottom Right";
  }

  showNotif_BottomLeft() {
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.BOTTOM_LEFT,
      type: AsiNotificationType.SUCCESS,
      delayInMs: 4000,
      withIcon : true
    });
    asiNotificationTR.getComponent().message = "Bottom Left";
  }

  showNotif_TopCenter() {
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.TOP_CENTER,
      type: AsiNotificationType.ERROR,
      delayInMs: 4000,
      withIcon : true
    });
    asiNotificationTR.getComponent().message = "TOP Center";
  }

  showNotif_BottomCenter() {
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.BOTTOM_CENTER,
      type: AsiNotificationType.ERROR,
      delayInMs: 4000,
      withIcon : true
    });
    asiNotificationTR.getComponent().message = "Bottom Center";
  }
}