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
import { AsiInputChipsModule } from './components/asi-input-chips/asi-input-chips.module';
import { AsiInputIconModule } from './components/asi-input-icon/asi-input-icon.module';
import { AsiErrorMessagesModule } from './components/asi-error-messages/asi-error-messages.module';
import { AsiTabGroupModule } from './components/asi-tab-group/asi-tab-group.module';
import { AsiCheckBoxModule } from './components/asi-checkbox/asi-checkbox.module';
import { AsiIconCheckBoxModule } from './components/asi-icon-checkbox/asi-icon-checkbox.module';
import { AsiRadioGroupModule } from './components/asi-radio-group/asi-radio-group.module';
import { AsiDropdownModule } from './components/asi-dropdown/asi-dropdown.module';
import { AsiValidatorsModule } from './validators/asi-validators.module';
import { AsiIbanFRInputModule } from './components/asi-ibanfr-input/asi-ibanfr-input.module';
import { AsiTreeViewModule } from './components/asi-tree-view/asi-tree-view.module';

@NgModule({
  declarations: [],
  imports: [
    AsiInputModule.forRoot(),
    AsiInputNumberModule.forRoot(),
    AsiInputChipsModule.forRoot(),
    AsiRadioGroupModule.forRoot(),
    AsiSelectModule.forRoot(),
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
    AsiInputIconModule.forRoot(),
    AsiIbanFRInputModule.forRoot(),
    AsiValidatorsModule.forRoot(),
    AsiTreeViewModule.forRoot()
  ],
  exports: [
    AsiInputModule,
    AsiInputNumberModule,
    AsiInputChipsModule,
    AsiRadioGroupModule,
    AsiSelectModule,
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
    AsiInputIconModule,
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
