import { AsiMenuItem } from './asi-menu-item.component';
import {
  Component, Input, ContentChild, TemplateRef, QueryList,
  AfterContentInit, ContentChildren
} from '@angular/core';


@Component({
  selector: 'asi-menu',
  host: { 'class': 'asi-component asi-menu' },
  templateUrl: './asi-menu.component.html'
})
export class AsiMenu implements AfterContentInit {

  /** is enabled/disabled */
  @Input() disabled = false;

  /** change to a menu burger */
  @Input() burger = false;

  /** horizontal/vertical */
  @Input() vertical = false;

  items = new Array<AsiMenuItem>();

  @ContentChildren(AsiMenuItem) queryItems: QueryList<AsiMenuItem>;

  @ContentChild('burger', {static: false}) burgerTemplate: TemplateRef<any>;

  burgerOpen: Boolean;

  constructor() { }

  toggleBurger() {
    this.burgerOpen = !this.burgerOpen;
  }

  ngAfterContentInit() {
    this.items = [];
    this.queryItems.forEach((item) => {
      this.items.push(item);
    });
    this.queryItems.changes.subscribe((items) => {
      this.items = items;
    });
    this.burgerOpen = !this.burger;
  }
}
