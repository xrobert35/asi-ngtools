import { AsiTab } from './../asi-tab/asi-tab.component';
import { Input, Component, HostBinding } from '@angular/core';
import * as nh from '../../../native-helper';

@Component({
  selector: 'asi-tab-content',
  templateUrl: 'asi-tab-content.component.html'
})
export class AsiTabContent {

  @HostBinding('class') class = null;

  @Input() tabs: Array<AsiTab>;

  /** Active tab id */
  @Input()
  set activeTab(tabId) {
    this.showTabById(tabId);
  }

  currentTab: AsiTab;

  private baseClass = 'asi-component asi-tab-content';

  constructor() {
    this.class = this.baseClass;
  }

  getTabs() {
    return this.tabs;
  }

  showTabById(tabId: string) {
    if (tabId != null) {
      const tabToActive = nh.find(this.tabs, (tab) => {
        return tab.tabId === tabId;
      });
      if (tabToActive) {
        this.showTab(tabToActive);
      }
    }
  }

  showTab(tab: AsiTab) {
    if (this.currentTab != null) {
      this.currentTab.active = false;
    }
    this.currentTab = tab;
    this.currentTab.active = true;

    if (this.currentTab.tabClass) {
      this.class = this.baseClass + '' + this.currentTab.tabClass;
    } else {
      this.class = this.baseClass;
    }
  }
}
