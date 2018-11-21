import { AsiNav } from './asi-nav/asi-nav.component';
import { Component, QueryList, ContentChildren, AfterContentInit, HostBinding } from '@angular/core';

@Component({
  selector: 'asi-nav-group',
  templateUrl: 'asi-nav-group.component.html'
})
export class AsiNavGroup implements AfterContentInit {

  @HostBinding('class') class = 'asi-component asi-nav-group';

  @ContentChildren(AsiNav) queryNavs: QueryList<AsiNav>;

  navs = new Array<AsiNav>();

  constructor() {}

  ngAfterContentInit() {
    this.navs = new Array<AsiNav>();
    this.queryNavs.forEach((nav) => {
      this.navs.push(nav);
    });
    this.queryNavs.changes.subscribe((navs) => {
      this.navs = navs;
    });
  }
}
