import { PresentationAsiPaginationComponent } from './services/presentation-asipagination/presentation-asipagination.component';
import { PresentationAsiMomentComponent } from './services/presentation-asimoment/presentation-asimoment.component';
import { PresentationAsiFileComponent } from './services/presentation-asifile/presentation-asifile.component';
import { PresentationAsiCssInjectorComponent } from './services/presentation-asicssinjector/presentation-asicssinjector.component';
import { PresentationAsiServices } from './services/presentation-asi-services.component';
import { PresentationAsiFilterComponent } from './pipes/presentation-asifilter/presentation-asifilter.component';
import { PresentationAsiIntArrayComponent } from './pipes/presentation-asi-intArray/presentation-asi-intArray.component';
import { PresentationAsiDateComponent } from './pipes/presentation-asidate/presentation-asidate.component';
import { PresentationAsiConcatTranslateComponent } from './pipes/presentation-asiconcattranslate/presentation-asiconcattranslate.component';
import { PresentationAsiConcatComponent } from './pipes/presentation-asiconcat/presentation-asiconcat.component';
import { PresentationAsiPipes } from './pipes/presentation-asi-pipes.component';
import { PresentationAsiValidators } from './validators/presentation-asi-validators.component';
import { PresentationAsiEmailComponent } from './validators/presentation-asi-email/presentation-asi-email.component';
import { PresentationAsiComponents } from './components/presentation-asi-components.component';
import { PresentationAsiDmyPickerComponent } from './components/presentation-asi-dmypicker/presentation-asi-dmypicker.component';
import { PresentationAsiCollapseComponent } from './components/presentation-asi-collapse/presentation-asi-collapse.component';
import { PresentationAsiBindHtmlComponent } from './components/presentation-asi-bind-html/presentation-asi-bind-html.component';
import { PresentationAsiCodeViewerComponent } from './components/presentation-asi-code-viewer/presentation-asi-code-viewer.component';
import { PresentationAsiFaIconComponent } from './components/presentation-asi-fa-icon/presentation-asi-fa-icon.component';
import { PresentationAsiErrorMessagesComponent } from './components/presentation-asi-error-messages/presentation-asi-error-messages.component';
import { PresentationAsiButtonComponent } from './components/presentation-asi-button/presentation-asi-button.component';
import { PresentationAsiDatepickerComponent } from './components/presentation-asi-datepicker/presentation-asi-datepicker.component';
import { PresentationAsiRadioGroupComponent } from './components/presentation-asi-radio-group/presentation-asi-radio-group.component';
import { PresentationAsiTabGroupComponent } from './components/presentation-asi-tab-group/presentation-asi-tab-group.component';
import { PresentationAsiFileChooserComponent } from './components/presentation-asi-file-chooser/presentation-asi-file-chooser.component';
import { PresentationAsiCheckboxComponent } from './components/presentation-asi-checkbox/presentation-asi-checkbox.component';
import { PresentationAsiTextAreaComponent } from './components/presentation-asi-textarea/presentation-asi-textarea.component';
import { PresentationAsiInputComponent } from './components/presentation-asi-input/presentation-asi-input.component';
import { PresentationAsiInputChipsComponent } from './components/presentation-asi-input-chips/presentation-asi-input-chips.component';
import { QuickStartComponent } from './quick-start/quick-start.component';
import { CommonModule } from '@angular/common';
import { AsiShowroomCommonModule } from '@common/asi-showroom-common.module';
import { AsiNgToolsPage } from './asi-ngtools.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AsiNgToolsMenuComponent } from './asi-ngtools-menu/asi-ngtools-menu.component';
import { AsiNgToolsApiComponent } from './asi-ngtools-api/asi-ngtools-api.component';
import { PresentationAsiTinyMCEComponent } from './components/presentation-asi-tinymce/presentation-asi-tinymce.component';
import { PresentationAsiImageChooserComponent } from './components/presentation-asi-image-chooser/presentation-asi-image-chooser.component';
import { PresentationAsiAutoCompleteComponent } from './components/presentation-asi-autocomplete/presentation-asi-autocomplete.component';
import { PresentationAsiMenuComponent } from './components/presentation-asi-menu/presentation-asi-menu.component';
import { PresentationAsiDialogComponent } from './components/presentation-asi-dialog/presentation-asi-dialog.component';
import { PresentationAsiSwitchComponent } from './components/presentation-asi-switch/presentation-asi-switch.component';
import { PresentationAsiNotificationComponent } from './components/presentation-asi-notification/presentation-asi-notification.component';
import { PresentationAsiSelectComponent } from './components/presentation-asi-select/presentation-asi-select.component';
import { PresentationAsiTableComponent } from './components/presentation-asi-table/presentation-asi-table.component';
import { PresentationAsiTreeViewComponent } from './components/presentation-asi-tree-view/presentation-asi-tree-view.component';
import { DialogComponent } from './components/presentation-asi-dialog/dialog-component/dialog.component';
import { NotificationComponent } from './components/presentation-asi-notification/notification-component/notification.component';
import { PresentationAsiBreadcrumbComponent } from './components/presentation-asi-breadcrumb/presentation-asi-breadcrumb.component';
import { PresentationAsiDropdownComponent } from './components/presentation-asi-dropdown/presentation-asi-dropdown.component';
import { PresentationAsiIconCheckboxComponent } from './components/presentation-asi-icon-checkbox/presentation-asi-icon-checkbox.component';
import { PresentationAsiInputIconComponent } from './components/presentation-asi-input-icon/presentation-asi-input-icon.component';
import { PresentationAsiLocalStorageComponent } from './services/presentation-asilocalstorage/presentation-asilocalstorage.component';
import { PresentationAsiSessionStorageComponent } from './services/presentation-asisessionstorage/presentation-asisessionstorage.component';
import { FragmentPolyfillModule } from '@common/utils/FragmentPolyfill.module';
import { FullFormComponent } from './full-form/full-form.component';
import { StyleOverrideComponent } from './style-override/style-override.component';
import { PresentationAsiInputNumberComponent } from './components/presentation-asi-input-number/presentation-asi-input-number.component';
import { PresentationAsiNavGroupComponent } from './components/presentation-asi-nav-group/presentation-asi-nav-group.component';
import { PresentationAsiNavViewComponent } from './components/presentation-asi-nav-group/nav/presentation-asi-nav-view.component';

const asiNgToolsRoutes: Routes = [{
  path: '',
  component: AsiNgToolsPage,
  children: [
    {
      path: 'quick-start', component: QuickStartComponent
    },
    { path: 'form', component: FullFormComponent },
    { path: 'style-override', component: StyleOverrideComponent },
    {
      path: 'components', component: PresentationAsiComponents, children: [
        { path: 'asi-select', component: PresentationAsiSelectComponent },
        { path: 'asi-input', component: PresentationAsiInputComponent },
        { path: 'asi-input-number', component: PresentationAsiInputNumberComponent },
        { path: 'asi-input-chips', component: PresentationAsiInputChipsComponent },
        { path: 'asi-input-icon', component: PresentationAsiInputIconComponent },
        { path: 'asi-icon-checkbox', component: PresentationAsiIconCheckboxComponent },
        { path: 'asi-button', component: PresentationAsiButtonComponent },
        { path: 'asi-textarea', component: PresentationAsiTextAreaComponent },
        { path: 'asi-notification', component: PresentationAsiNotificationComponent },
        { path: 'asi-datepicker', component: PresentationAsiDatepickerComponent },
        { path: 'asi-table', component: PresentationAsiTableComponent },
        { path: 'asi-dialog', component: PresentationAsiDialogComponent },
        { path: 'asi-switch', component: PresentationAsiSwitchComponent },
        { path: 'asi-checkbox', component: PresentationAsiCheckboxComponent },
        { path: 'asi-tab-group', component: PresentationAsiTabGroupComponent },
        {
          path: 'asi-nav-group', component: PresentationAsiNavGroupComponent, children: [
            { path: 'asi-nav-1', component: PresentationAsiNavViewComponent, data: { nav: '1' } },
            { path: 'asi-nav-2', component: PresentationAsiNavViewComponent, data: { nav: '2' } },
            { path: 'asi-nav-3', component: PresentationAsiNavViewComponent, data: { nav: '3' } },
            { path: '', redirectTo: 'asi-nav-3', pathMatch: 'full' },
          ]
        },
        { path: 'asi-radio-group', component: PresentationAsiRadioGroupComponent },
        { path: 'asi-error-messages', component: PresentationAsiErrorMessagesComponent },
        { path: 'asi-code-viewer', component: PresentationAsiCodeViewerComponent },
        { path: 'asi-bind-html', component: PresentationAsiBindHtmlComponent },
        { path: 'asi-collapse', component: PresentationAsiCollapseComponent },
        { path: 'asi-dmypicker', component: PresentationAsiDmyPickerComponent },
        { path: 'asi-breadcrumb', component: PresentationAsiBreadcrumbComponent },
        {
          path: 'asi-menu', component: PresentationAsiMenuComponent,
          children: [
            { path: 'root', component: PresentationAsiSelectComponent },
            { path: 'root1', component: PresentationAsiTableComponent },
            { path: 'root2', component: PresentationAsiDialogComponent }
          ]
        },
        { path: 'asi-autocomplete', component: PresentationAsiAutoCompleteComponent },
        { path: 'asi-image-chooser', component: PresentationAsiImageChooserComponent },
        { path: 'asi-fa-icon', component: PresentationAsiFaIconComponent },
        { path: 'asi-file-chooser', component: PresentationAsiFileChooserComponent },
        { path: 'asi-tree-view', component: PresentationAsiTreeViewComponent },
        { path: '', redirectTo: 'asi-autocomplete', pathMatch: 'full' },
      ]
    },
    {
      path: 'pipes', component: PresentationAsiPipes, children: [
        { path: 'asi-concat', component: PresentationAsiConcatComponent },
        { path: 'asi-concat-translate', component: PresentationAsiConcatTranslateComponent },
        { path: 'asi-date', component: PresentationAsiDateComponent },
        { path: 'asi-filter', component: PresentationAsiFilterComponent },
        { path: 'asi-intArray', component: PresentationAsiIntArrayComponent },
        { path: '', redirectTo: 'asi-concat', pathMatch: 'full' },
      ]
    },
    {
      path: 'services', component: PresentationAsiServices, children: [
        { path: 'asi-css-injector', component: PresentationAsiCssInjectorComponent },
        { path: 'asi-file', component: PresentationAsiFileComponent },
        { path: 'asi-moment', component: PresentationAsiMomentComponent },
        { path: 'asi-pagination', component: PresentationAsiPaginationComponent },
        { path: 'asi-localstorage', component: PresentationAsiLocalStorageComponent },
        { path: 'asi-sessionstorage', component: PresentationAsiSessionStorageComponent },
        { path: '', redirectTo: 'asi-cssinjector', pathMatch: 'full' },
      ]
    },
    {
      path: 'validators', component: PresentationAsiValidators, children: [
        { path: 'asi-email', component: PresentationAsiEmailComponent },
        { path: '', redirectTo: 'asi-email', pathMatch: 'full' },
      ]
    },
    { path: '', redirectTo: 'quick-start', pathMatch: 'full' },
  ]
}
];

export const asiNgToolsPresentationRouting: ModuleWithProviders = RouterModule.forChild(asiNgToolsRoutes);

@NgModule({
  declarations: [
    QuickStartComponent,
    FullFormComponent,
    StyleOverrideComponent,
    AsiNgToolsMenuComponent,
    AsiNgToolsApiComponent,
    AsiNgToolsPage,
    PresentationAsiComponents,
    PresentationAsiConcatComponent,
    PresentationAsiConcatTranslateComponent,
    PresentationAsiDateComponent,
    PresentationAsiPipes,
    PresentationAsiFilterComponent,
    PresentationAsiIntArrayComponent,
    PresentationAsiServices,
    PresentationAsiCssInjectorComponent,
    PresentationAsiMomentComponent,
    PresentationAsiPaginationComponent,
    PresentationAsiFileComponent,
    PresentationAsiSelectComponent,
    PresentationAsiInputComponent,
    PresentationAsiInputChipsComponent,
    PresentationAsiInputNumberComponent,
    PresentationAsiTextAreaComponent,
    PresentationAsiTinyMCEComponent,
    PresentationAsiImageChooserComponent,
    PresentationAsiAutoCompleteComponent,
    PresentationAsiDmyPickerComponent,
    PresentationAsiMenuComponent,
    PresentationAsiDialogComponent,
    PresentationAsiCollapseComponent,
    PresentationAsiSwitchComponent,
    PresentationAsiNotificationComponent,
    PresentationAsiTableComponent,
    PresentationAsiBindHtmlComponent,
    PresentationAsiCheckboxComponent,
    PresentationAsiFaIconComponent,
    PresentationAsiCodeViewerComponent,
    PresentationAsiFileChooserComponent,
    PresentationAsiRadioGroupComponent,
    PresentationAsiTabGroupComponent,
    PresentationAsiNavGroupComponent,
    PresentationAsiNavViewComponent,
    PresentationAsiDatepickerComponent,
    PresentationAsiButtonComponent,
    PresentationAsiErrorMessagesComponent,
    PresentationAsiValidators,
    PresentationAsiEmailComponent,
    PresentationAsiTreeViewComponent,
    PresentationAsiBreadcrumbComponent,
    PresentationAsiDropdownComponent,
    PresentationAsiIconCheckboxComponent,
    PresentationAsiInputIconComponent,
    PresentationAsiLocalStorageComponent,
    PresentationAsiSessionStorageComponent,
    DialogComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    AsiShowroomCommonModule,
    asiNgToolsPresentationRouting,
    FragmentPolyfillModule.forRoot({
      smooth: true
    }),
  ],
  entryComponents: [NotificationComponent, DialogComponent]
})
export class AsiNgToolsPresentationModule { }
