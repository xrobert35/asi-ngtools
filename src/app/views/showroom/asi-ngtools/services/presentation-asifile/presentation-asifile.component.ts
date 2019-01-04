import { AsiFileService, AsiNotificationService, AsiNotificationPosition, AsiNotificationType } from '@asi-ngtools/lib';
import { Component, HostBinding } from '@angular/core';
import { NotificationComponent } from '../../services/presentation-asi-notification/notification-component/notification.component';

const _apiDoc = require('./asifile-api.json');

@Component({
  selector: 'presentation-asifile',
  templateUrl: './presentation-asifile.component.html',
})
export class PresentationAsiFileComponent {

  @HostBinding('class') class = 'page';

  public fcts: any[] = [];
  public apiDoc = _apiDoc;

  constructor(private fileService: AsiFileService, private asiNotificationService: AsiNotificationService) {
  }

  dlFile() {
    this.fileService.downloadFile('http://asi-central/asi-central-server/DOCTEST.pdf', 'testFile').subscribe(
      () => {
        const asiNotificationTR = this.asiNotificationService.fromComponent(NotificationComponent, {
          position: AsiNotificationPosition.BOTTOM_CENTER,
          type: AsiNotificationType.SUCCESS,
          delayInMs: 2000,
          withIcon: true
        });
        asiNotificationTR.getComponent().message = 'File downloaded!';
      }
    );
  }
}
