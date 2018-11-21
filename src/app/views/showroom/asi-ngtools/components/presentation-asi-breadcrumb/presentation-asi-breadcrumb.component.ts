import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-breadcrumb',
  templateUrl: './presentation-asi-breadcrumb.component.html',
})
export class PresentationAsiBreadcrumbComponent {

  @HostBinding('class') class = 'flex';

  public elements: Array<{name: string, value: number}>;

  constructor() {
    this.elements = new Array<{name: string, value: number}>();
    this.elements.push({'name': 'Folder1', 'value': 1});
    this.elements.push({'name': 'A very big folder name', 'value': 2});
    this.elements.push({'name': 'Folder3', 'value': 3});
    this.elements.push({'name': 'Tiny', 'value': 6});
  }

  public addFolder() {
    this.elements.push({'name': 'New Folder', 'value': -1});
  }

  public itemClicked(newData: Array<{name: string, value: number}>) {
    this.elements = newData;
  }
}
