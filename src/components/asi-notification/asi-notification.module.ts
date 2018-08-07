import { AsiFaIconModule } from './../asi-fa-icon/asi-fa-icon.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNotification } from './notification/asi-notification.component';
import { AsiNotificationContainer } from './container/asi-notification-container.component';
import { AsiNotificationService } from './asi-notification.service';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';

export * from './../../asi-ngtools-base.module';
export * from './asi-notification.service';
export * from './notification/asi-notification.component';
export * from './container/asi-notification-container.component'
export * from './asi-notification-config';
export * from './../common/component-type';
export * from './../asi-fa-icon/asi-fa-icon.module';

@NgModule({
  declarations: [AsiNotificationContainer, AsiNotification],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiFaIconModule.forRoot()],
  exports: [AsiNgToolsBaseModule],
  entryComponents: [AsiNotificationContainer, AsiNotification],
  providers: [AsiNotificationService]
})
export class AsiNotificationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiNotificationModule,
      providers: [AsiNotificationService]
    };
  }
}
