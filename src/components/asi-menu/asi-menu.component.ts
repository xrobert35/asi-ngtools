import { AsiMenuItem } from './asi-menu-item.component';
import { Component, Input, ContentChild, TemplateRef, QueryList, AfterContentInit, ContentChildren } from '@angular/core';


@Component({
  selector: 'asi-menu',
  templateUrl: './asi-menu.component.html',
  host: { 'class': 'asi-component asi-menu' },
})
export class AsiMenu implements AfterContentInit {

  @Input() burger = false;
  @Input() vertical = false;
  @Input() items = new Array<AsiMenuItem>();

  @ContentChildren(AsiMenuItem) queryItems: QueryList<AsiMenuItem>;
  @ContentChild("burger") burgerTemplate: TemplateRef<any>;

  burgerOpen: Boolean;

  constructor() {
  }

  ngOnInit(){
  }

  toggleBurger() {
    this.burgerOpen = !this.burgerOpen;
  }

  ngAfterContentInit() {
    this.items = [];
    this.queryItems.forEach((item) => {
      this.items.push(item);
    });
    this.queryItems.changes.subscribe ( (items)=> {
      this.items = items;
    });
    this.burgerOpen = !this.burger;
  }
}