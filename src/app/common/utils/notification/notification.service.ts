import { NotificationComponent } from './notification.component';
import { Injectable } from '@angular/core';
import { AsiNotificationService, AsiNotificationPosition, AsiNotificationType } from '@asi-ngtools/lib';

@Injectable()
export class NotificationService {

  constructor(private asiNotification: AsiNotificationService) { }

  public showTemporaryInformationMessage(message: string) {
    const notification = this.asiNotification.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.TOP_RIGHT,
      type: AsiNotificationType.SUCCESS,
      delayInMs: 3000,
      withIcon : true
    });
    notification.getComponent().message = message;
  }

  public showTemporaryErrorMessage(message: string) {
    const notification = this.asiNotification.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.TOP_RIGHT,
      type: AsiNotificationType.ERROR,
      delayInMs: 3000,
      withIcon : true
    });
    notification.getComponent().message = message;
  }

}
