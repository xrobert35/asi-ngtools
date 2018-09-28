import { AsiFileService, AsiNotificationService, AsiNotificationPosition, AsiNotificationType } from '@asi-ngtools/lib';
import { Component } from '@angular/core';
import { NotificationComponent } from 'app/pages/central/pages/outils/asi-ngtools/components/presentation-asi-notification/notification-component/notification.component';

@Component({
  selector: 'presentation-asi-file-service',
  templateUrl: './presentation-asi-file-service.component.html',
  host: { 'class': 'page' }
})
export class PresentationAsiFileService {

  constructor(private fileService: AsiFileService, private asiNotificationService: AsiNotificationService) {

  }

  dlFile() {
    this.fileService.downloadFile('http://localhost:4200/asi-central-server/DOCTEST.pdf', 'testFile').subscribe(
      res => {
        let asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
          position: AsiNotificationPosition.BOTTOM_CENTER,
          type: AsiNotificationType.SUCCESS,
          delayInMs: 2000
        });
        asiNotificationTR.getComponent().message = "File downloaded!";
      }
    );
  }
}