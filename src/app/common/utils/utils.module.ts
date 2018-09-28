import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification/notification.service';
import { NotificationComponent } from './notification/notification.component';
import { AsiNgToolsModule } from '@asi-ngtools/lib';
import { RouterModule } from '@angular/router';
import { ApiFunctionAsHTMLService } from '@common/utils/apiFunctionAsHTMLService.service';

import { HttpModule } from '@angular/http';

// Dialogs
import { ConfirmDialog } from '@utils/dialog/confirm/confirm.dialog';
import { DialogsService } from '@utils/dialog/dialog.service';
import { UniversalService } from '@common/utils/universal.service';

const declarations: Array<any> = [
  ConfirmDialog,
  NotificationComponent
];

const sharedModules: Array<any> = [
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [CommonModule, HttpModule, RouterModule,
    ...sharedModules,
    AsiNgToolsModule.forRoot()],
  declarations: [...declarations],
  exports: [AsiNgToolsModule, ...sharedModules],
  providers: [
    DialogsService,
    NotificationService,
    UniversalService,
    ApiFunctionAsHTMLService,
  ],
  entryComponents: [ConfirmDialog, NotificationComponent]
})
export class UtilsModule {
}
