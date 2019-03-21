import { AsiTabContent } from './asi-tab-content/asi-tab-content.component';
import { AsiTab } from './asi-tab/asi-tab.component';
import {
  Component, QueryList, ContentChildren, ViewChild, AfterContentInit,
  Output, EventEmitter, Input
} from '@angular/core';

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
  @Input() activeTab: string;

  tabs = new Array<AsiTab>();

  constructor() { }

  showTab(tab: AsiTab) {
    this.asiTableContent.showTab(tab);
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
    this.queryTabs.changes.subscribe((asiTab) => {
      this.manageTabContent(asiTab);
    });

    setTimeout(() => {
      if (this.activeTab != null) {
        this.asiTableContent.showTabById(this.activeTab);
      } else {
        this.asiTableContent.showTab(this.tabs[0]);
      }
    });
  }


  private manageTabContent(asiTabs: AsiTab[]) {
    let index = -1;
    this.tabs = [];
    asiTabs.forEach(tab => {
      tab.index = ++index;
      this.tabs.push(tab)
    });
  }
}
