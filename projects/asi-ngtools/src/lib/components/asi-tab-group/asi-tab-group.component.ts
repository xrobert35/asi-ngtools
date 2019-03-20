import { AsiTabContent } from './asi-tab-content/asi-tab-content.component';
import { AsiTab } from './asi-tab/asi-tab.component';
import { Component, QueryList, ContentChildren, ViewChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'asi-tab-group',
  host: { 'class': 'asi-component asi-tab-group' },
  templateUrl: 'asi-tab-group.component.html'
})
export class AsiTabGroup implements AfterContentInit {

  @ContentChildren(AsiTab) queryTabs: QueryList<AsiTab>;

  @ViewChild(AsiTabContent) asiTableContent: AsiTabContent;

  tabs = new Array<AsiTab>();

  constructor() { }

  showTab(tab: AsiTab) {
    this.asiTableContent.showTab(tab);
  }

  getTabs() {
    return this.tabs;
  }

  ngAfterContentInit() {
    this.manageTabContent(this.queryTabs.toArray())
    this.queryTabs.changes.subscribe((asiTab) => {
      this.manageTabContent(asiTab);
    });
  }

  private manageTabContent(asiTabs: AsiTab[]) {
    let index = -1;
    asiTabs.forEach(tab => {
      tab.index = ++index;
      this.tabs.push(tab)
    });
  }
}
