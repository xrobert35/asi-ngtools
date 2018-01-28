import { NgModule, ModuleWithProviders } from '@angular/core';
import { AsiButtonModule } from './components/asi-button/asi-button.module';
import { AsiDmyPickerModule } from './components/asi-dmypicker/asi-dmypicker.module';
import { AsiPipesModule } from './pipes/asi-pipes.module';
import { AsiServicesModule } from './services/asi-services.module';
import { AsiDirectivesModule } from './directives/asi-directives.module';
import { AsiTinyMCEModule } from './components/asi-tinymce/asi-tinymce.module';
import { AsiMenuModule } from './components/asi-menu/asi-menu.module';
import { AsiTextareaModule } from './components/asi-textarea/asi-textarea.module';
import { AsiTableModule } from './components/asi-table/asi-table.module';
import { AsiSwitchModule } from './components/asi-switch/asi-switch.module';
import { AsiSelectModule } from './components/asi-select/asi-select.module';
import { AsiPaginationModule } from './components/asi-pagination/asi-pagination.module';
import { AsiNotificationModule } from './components/asi-notification/asi-notification.module';
import { AsiAutoCompleteModule } from './components/asi-autocomplete/asi-autocomplete.module';
import { AsiBindHtmlModule } from './components/asi-bind-html/asi-bind-html.module';
import { AsiCodeViewerModule } from './components/asi-code-viewer/asi-code-viewer.module';
import { AsiCollapseModule } from './components/asi-collapse/asi-collapse.module';
import { AsiDatePickerModule } from './components/asi-datepicker/asi-datepicker.module';
import { AsiDialogModule } from './components/asi-dialog/asi-dialog.module';
import { AsiFaIconModule } from './components/asi-fa-icon/asi-fa-icon.module';
import { AsiBreadcrumbModule } from './components/asi-breadcrumb/asi-breadcrumb.module';
import { AsiImageChooserModule } from './components/asi-image-chooser/asi-image-chooser.module';
import { AsiFileChooserModule } from './components/asi-file-chooser/asi-file-chooser.module';
import { AsiInputNumberModule } from './components/asi-input-number/asi-input-number.module';
import { AsiInputModule } from './components/asi-input/asi-input.module';
import { AsiIconInputModule } from './components/asi-icon-input/asi-icon-input.module';
import { AsiErrorMessagesModule } from './components/asi-error-messages/asi-error-messages.module';
import { AsiTabGroupModule } from './components/asi-tab-group/asi-tab-group.module';
import { AsiCheckBoxModule } from './components/asi-checkbox/asi-checkbox.module';
import { AsiIconCheckBoxModule } from './components/asi-icon-checkbox/asi-icon-checkbox.module';
import { AsiRadioGroupModule } from './components/asi-radio-group/asi-radio-group.module';
import { AsiDropdownModule } from './components/asi-dropdown/asi-dropdown.module';
import { AsiValidatorsModule } from './validators/asi-validators.module';
import { AsiIbanFRInputModule } from './components/asi-ibanfr-input/asi-ibanfr-input.module';
import { AsiTreeViewModule } from './components/asi-tree-view/asi-tree-view.module';

export * from './components/asi-button/asi-button.module';
export * from './components/asi-dmypicker/asi-dmypicker.module';

export * from './components/asi-tinymce/asi-tinymce.module';
export * from './components/asi-menu/asi-menu.module';
export * from './components/asi-textarea/asi-textarea.module';
export * from './components/asi-table/asi-table.module';
export * from './components/asi-switch/asi-switch.module';
export * from './components/asi-select/asi-select.module';
export * from './components/asi-pagination/asi-pagination.module';
export * from './components/asi-notification/asi-notification.module';
export * from './components/asi-autocomplete/asi-autocomplete.module';
export * from './components/asi-bind-html/asi-bind-html.module';
export * from './components/asi-breadcrumb/asi-breadcrumb.module';
export * from './components/asi-code-viewer/asi-code-viewer.module';
export * from './components/asi-collapse/asi-collapse.module';
export * from './components/asi-datepicker/asi-datepicker.module';
export * from './components/asi-dialog/asi-dialog.module';
export * from './components/asi-fa-icon/asi-fa-icon.module';
export * from './components/asi-image-chooser/asi-image-chooser.module';
export * from './components/asi-file-chooser/asi-file-chooser.module';
export * from './components/asi-input-number/asi-input-number.module';
export * from './components/asi-input/asi-input.module';
export * from './components/asi-icon-input/asi-icon-input.module';
export * from './components/asi-error-messages/asi-error-messages.module';
export * from './components/asi-tab-group/asi-tab-group.module';
export * from './components/asi-checkbox/asi-checkbox.module';
export * from './components/asi-icon-checkbox/asi-icon-checkbox.module';
export * from './components/asi-radio-group/asi-radio-group.module';
export * from './components/asi-dropdown/asi-dropdown.module';
export * from './components/asi-ibanfr-input/asi-ibanfr-input.module';
export * from './components/asi-tree-view/asi-tree-view.module';
export * from './pipes/asi-pipes.module';
export * from './validators/asi-validators.module';
export * from './services/asi-services.module';
export * from './asi-ngtools-base.module';

@NgModule({
  declarations: [],
  imports: [
    AsiInputModule.forRoot(),
    AsiRadioGroupModule.forRoot(),
    AsiSelectModule.forRoot(),
    AsiInputNumberModule.forRoot(),
    AsiCheckBoxModule.forRoot(),
    AsiIconCheckBoxModule.forRoot(),
    AsiTabGroupModule.forRoot(),
    AsiFileChooserModule.forRoot(),
    AsiImageChooserModule.forRoot(),
    AsiErrorMessagesModule.forRoot(),
    AsiDatePickerModule.forRoot(),
    AsiCollapseModule.forRoot(),
    AsiCodeViewerModule.forRoot(),
    AsiBindHtmlModule.forRoot(),
    AsiAutoCompleteModule.forRoot(),
    AsiBreadcrumbModule.forRoot(),
    AsiPaginationModule.forRoot(),
    AsiSwitchModule.forRoot(),
    AsiTableModule.forRoot(),
    AsiTextareaModule.forRoot(),
    AsiMenuModule.forRoot(),
    AsiTinyMCEModule.forRoot(),
    AsiDirectivesModule.forRoot(),
    AsiFaIconModule.forRoot(),
    AsiButtonModule.forRoot(),
    AsiDmyPickerModule.forRoot(),
    AsiPipesModule.forRoot(),
    AsiServicesModule.forRoot(),
    AsiDropdownModule.forRoot(),
    AsiNotificationModule.forRoot(),
    AsiDialogModule.forRoot(),
    AsiIconInputModule.forRoot(),
    AsiIbanFRInputModule.forRoot(),
    AsiValidatorsModule.forRoot(),
    AsiTreeViewModule.forRoot()
  ],
  exports: [
    AsiInputModule,
    AsiRadioGroupModule,
    AsiSelectModule,
    AsiInputNumberModule,
    AsiCheckBoxModule,
    AsiIconCheckBoxModule,
    AsiTabGroupModule,
    AsiFileChooserModule,
    AsiImageChooserModule,
    AsiErrorMessagesModule,
    AsiDatePickerModule,
    AsiCollapseModule,
    AsiCodeViewerModule,
    AsiBreadcrumbModule,
    AsiBindHtmlModule,
    AsiAutoCompleteModule,
    AsiPaginationModule,
    AsiSwitchModule,
    AsiTableModule,
    AsiTextareaModule,
    AsiMenuModule,
    AsiTinyMCEModule,
    AsiDirectivesModule,
    AsiFaIconModule,
    AsiButtonModule,
    AsiDmyPickerModule,
    AsiPipesModule,
    AsiServicesModule,
    AsiNotificationModule,
    AsiDropdownModule,
    AsiDialogModule,
    AsiIconInputModule,
    AsiIbanFRInputModule,
    AsiValidatorsModule,
    AsiTreeViewModule
  ],
  entryComponents: [],
  providers: []
})
export class AsiNgToolsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiNgToolsModule,
      providers: []
    };
  }
}
