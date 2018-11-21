import { Component, HostBinding } from '@angular/core';
import { AsiNotificationService, AsiNotificationPosition, AsiNotificationType, AsiNotification } from '@asi-ngtools/lib';
import { NotificationComponent } from '../../components/presentation-asi-notification/notification-component/notification.component';

@Component({
  selector: 'presentation-asi-fa-icon',
  templateUrl: './presentation-asi-fa-icon.component.html'
})
export class PresentationAsiFaIconComponent {

  @HostBinding('class') class = 'flex';

  constructor(private asiNotificationService: AsiNotificationService) {
  }

  action() {
    let asiNotificationTR: AsiNotification<NotificationComponent> = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.BOTTOM_CENTER,
      type: AsiNotificationType.SUCCESS,
      delayInMs: 1500,
      withIcon : false
    });
    asiNotificationTR.getComponent().message = 'fa-icon clicked!';
  }

}
