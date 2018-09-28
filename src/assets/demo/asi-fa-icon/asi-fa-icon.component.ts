import { Component } from '@angular/core';
import { AsiNotificationService, AsiNotificationPosition, AsiNotificationType } from '@asi-ngtools/lib';
import { NotificationComponent } from 'app/pages/central/pages/outils/asi-ngtools/components/presentation-asi-notification/notification-component/notification.component';

@Component({
  selector: 'presentation-asi-fa-icon',
  templateUrl: './presentation-asi-fa-icon.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiFaIconComponent {

  constructor(private asiNotificationService: AsiNotificationService) {
  }

  action(){
    let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
      position: AsiNotificationPosition.BOTTOM_CENTER,
      type: AsiNotificationType.SUCCESS,
      delayInMs: 1500,
      withIcon : false
    });
    asiNotificationTR.getComponent().message = "fa-icon clicked!";
  }

}