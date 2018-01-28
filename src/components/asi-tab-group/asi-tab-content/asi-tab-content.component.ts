import { AsiTab } from './../asi-tab/asi-tab.component';
import { Input, Component } from '@angular/core';
@Component({
  selector: 'asi-tab-content',
  templateUrl: 'asi-tab-content.component.html',
  host: { 'class': 'asi-component asi-tab-content' },
})
export class AsiTabContent {

  @Input() tabs: Array<AsiTab>;

  currentTab: AsiTab;

  constructor() {
  }

  getTabs() {
    return this.tabs;
  }

  showTab(tab: AsiTab) {
    if (this.currentTab != null) {
      this.currentTab.active = false;
    }
    this.currentTab = tab;
    this.currentTab.active = true;
  }

  ngOnChanges() {
    this.showTab(this.tabs[0]);
  }
}