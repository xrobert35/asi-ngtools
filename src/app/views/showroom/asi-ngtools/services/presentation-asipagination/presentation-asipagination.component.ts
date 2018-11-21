import { Component, HostBinding } from '@angular/core';
import { AsiPaginationService } from '@asi-ngtools/lib';

@Component({
  selector: 'presentation-asipagination',
  templateUrl: './presentation-asipagination.component.html',
})
export class PresentationAsiPaginationComponent {

  @HostBinding('class') class = 'flex';

  nbPages: number;
  array: Array<number>;
  page: Array<number>;

  nbElements = 65;
  nbElementsPerPage = 10;

  constructor(private pagination: AsiPaginationService) {
    this.computePages();
  }

  computePages() {
    this.array = new Array<number>();
    for (let i = 1; i <= this.nbElements; i++) {
      this.array.push(i);
    }

    this.nbPages = this.pagination.getNbPages(this.array, this.nbElementsPerPage);
  }

  updateAPage(nPage: number) {
    this.page = this.pagination.getPage(this.array, this.nbElementsPerPage, nPage);
  }

}
