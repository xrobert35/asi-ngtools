import { AsiTabContent } from './asi-tab-content/asi-tab-content.component';
import { AsiTab } from './asi-tab/asi-tab.component';
import {
  Component, QueryList, ContentChildren, ViewChild, AfterContentInit,
  Output, EventEmitter, Input
} from '@angular/core';
import * as nh from '../../native-helper';

@Component({
  selector: 'asi-tab-group',
  host: { 'class': 'asi-component asi-tab-group' },
  templateUrl: 'asi-tab-group.component.html'
})
export class AsiTabGroup implements AfterContentInit {

  @ContentChildren(AsiTab) queryTabs: QueryList<AsiTab>;

  @ViewChild(AsiTabContent) asiTableContent: AsiTabContent;

  /** Event emitted when a tab is manually selected */
  @Output() onTabChange = new EventEmitter<AsiTab>()

  /** Active tab id */
  @Input() activeTabId: string;

  private currentTabId = null;

  tabs = new Array<AsiTab>();

  constructor() { }

  showTab(tab: AsiTab) {
    this.asiTableContent.showTab(tab);
    this.currentTabId = tab.tabId;
    this.onTabChange.emit(tab);
  }

  public showTabById(idTab: string) {
    this.asiTableContent.showTabById(idTab);
  }

  getTabs() {
    return this.tabs;
  }

  ngAfterContentInit() {
    this.manageTabContent(this.queryTabs.toArray());
    this.asiTableContent.setTabs(this.tabs);
    /**Listen to content possible changes */
    this.queryTabs.changes.subscribe((asiTabs) => {
      this.manageTabContent(asiTabs);
      if (!nh.isEmpty(asiTabs) && (!this.currentTabId || !this.currentTabStillExist())) {
        this.currentTabId = this.tabs[0].tabId;
      }
      this.asiTableContent.setTabs(this.tabs);
      this.asiTableContent.showTabById(this.currentTabId);
    });

    if (this.activeTabId != null) {
      this.currentTabId = this.activeTabId;
    }
    if (!this.currentTabId && !nh.isEmpty(this.tabs)) {
      this.currentTabId = this.tabs[0].tabId;
    }
    this.asiTableContent.showTabById(this.currentTabId);
  }

  private currentTabStillExist(): boolean {
    return nh.find(this.tabs, (tab) => tab.tabId === this.currentTabId) != null;
  }

  private manageTabContent(asiTabs: AsiTab[]) {
    let index = -1;
    this.tabs = [];
    asiTabs.forEach(tab => {
      tab.index = ++index;
      if (!tab.tabId) {
        tab.tabId = 'tab' + index;
      }
      this.tabs.push(tab)
    });
  }
}
