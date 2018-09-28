import { Component } from '@angular/core';
import { AsiPaginationService } from '@asi-ngtools/lib';

@Component({
  selector: 'presentation-asipagination',
  templateUrl: './presentation-asipagination.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiPaginationComponent {

  nbPages: number;
  array: Array<number>;
  page: Array<number>;

  nbElements: number = 65;
  nbElementsPerPage: number = 10;

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

  updateAPage(nPage : number) {
    this.page = this.pagination.getPage(this.array, this.nbElementsPerPage, nPage);
  }

}