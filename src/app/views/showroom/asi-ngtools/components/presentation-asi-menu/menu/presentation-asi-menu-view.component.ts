import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'presentation-asi-menu-view',
  templateUrl: './presentation-asi-menu-view.component.html',
})
export class PresentationAsiMenuViewComponent {

  @HostBinding('class') class = 'flex';

  route: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.route = `You are on menu ${this.activatedRoute.snapshot.data.menu}`;
  }

}

