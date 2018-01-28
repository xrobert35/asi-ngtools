import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as lodash from 'lodash';

@Component({
  selector: 'asi-pagination',
  templateUrl: 'asi-pagination.component.html',
  host: { 'class': 'asi-component asi-pagination' }
})
export class AsiPaginationComponent {

  @Input() nbElements = 0;
  @Input() nbVisibleElements = 0;
  @Input() selectedPagination = 1;
  @Output() onPaginationChanged = new EventEmitter<number>();

  private static TRI_POINT = '...';

  onFirstPage() {
    return this.selectedPagination === 1;
  }

  onLastPage() {
    return this.selectedPagination === this.nbElements;
  }

  isCurrentPagination(pagination: number) {
    return this.selectedPagination === pagination;
  }

  changePagination(pagination: any) {
    if (pagination != AsiPaginationComponent.TRI_POINT) {
      this.selectedPagination = pagination;
      this.onPaginationChanged.emit(this.selectedPagination);
    }
  }

  previousPage() {
    if (this.selectedPagination > 1) {
      this.selectedPagination--;
      this.onPaginationChanged.emit(this.selectedPagination);
    }
  }

  nextPage() {
    if (this.selectedPagination < this.nbElements) {
      this.selectedPagination++;
      this.onPaginationChanged.emit(this.selectedPagination);
    }
  }

  goLastPage() {
    this.selectedPagination = this.nbElements;
    this.onPaginationChanged.emit(this.selectedPagination);
  }

  goFirstPage() {
    this.selectedPagination = 1;
    this.onPaginationChanged.emit(this.selectedPagination);
  }

  getPaginationItems() {
    var currentPage = this.selectedPagination;
    let halfVisibleElement = Math.floor(this.nbVisibleElements / 2);

    if (!this.nbElements) {
      this.nbElements = 1;
    }

    if (this.nbElements <= this.nbVisibleElements) {
      //Affichage complet
      return this.createNumbersTab(1, this.nbElements);
    } else if (currentPage < halfVisibleElement + 2) {
      //Debut de la pagination
      return lodash.concat(this.createNumbersTab(1, this.nbVisibleElements - 1), [AsiPaginationComponent.TRI_POINT, this.nbElements]);
    } else if (currentPage > this.nbElements - halfVisibleElement) {
      //Fin de la pagination
      return lodash.concat([1, AsiPaginationComponent.TRI_POINT], this.createNumbersTab(this.nbElements - this.nbVisibleElements + 2, this.nbElements));
    } else {
      // Entre les deux
      return lodash.concat([1, AsiPaginationComponent.TRI_POINT], this.createNumbersTab(currentPage - halfVisibleElement + 1, currentPage + halfVisibleElement - 1), [AsiPaginationComponent.TRI_POINT, this.nbElements]);
    }
  };

  createNumbersTab(min: number, max: number): Array<number> {
    var index = min - 1;
    return lodash.times(max - min + 1, () => {
      return ++index;
    });
  }

}