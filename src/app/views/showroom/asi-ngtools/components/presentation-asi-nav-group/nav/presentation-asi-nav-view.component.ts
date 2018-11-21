import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'presentation-asi-nav-view',
  templateUrl: './presentation-asi-nav-view.component.html',
})
export class PresentationAsiNavViewComponent {

  @HostBinding('class') class = 'flex';

  route: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.route = `You are on nav ${this.activatedRoute.snapshot.data.nav}`;
  }

}

