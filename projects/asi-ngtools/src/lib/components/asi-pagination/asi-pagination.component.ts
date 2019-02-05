import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as nh from '../../native-helper';

@Component({
  selector: 'asi-pagination',
  host: { 'class': 'asi-component asi-pagination' },
  templateUrl: 'asi-pagination.component.html',
})
export class AsiPaginationComponent {

  private static TRI_POINT = '...';

  @Input() nbElements = 0;
  @Input() nbVisibleElements = 0;
  @Input() selectedPagination = 1;
  @Output() onPaginationChanged = new EventEmitter<number>();

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
    if (pagination !== AsiPaginationComponent.TRI_POINT) {
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
    if (this.selectedPagination !== this.nbElements) {
      this.selectedPagination = this.nbElements;
      this.onPaginationChanged.emit(this.selectedPagination);
    }
  }

  goFirstPage() {
    if (this.selectedPagination !== 1) {
      this.selectedPagination = 1;
      this.onPaginationChanged.emit(this.selectedPagination);
    }
  }

  getPaginationItems() {
    const currentPage = this.selectedPagination;
    let halfVisibleElement = Math.floor(this.nbVisibleElements / 2);

    if (!this.nbElements) {
      this.nbElements = 1;
    }

    if (this.nbElements <= this.nbVisibleElements) {
      // Show all
      return this.createNumbersTab(1, this.nbElements);
    } else if (currentPage < halfVisibleElement + 2) {
      // Pagination start
      return nh.concat(this.createNumbersTab(1, this.nbVisibleElements - 1), [AsiPaginationComponent.TRI_POINT, this.nbElements]);
    } else if (currentPage > this.nbElements - halfVisibleElement) {
      // Pagination end
      return nh.concat([1, AsiPaginationComponent.TRI_POINT],
        this.createNumbersTab(this.nbElements - this.nbVisibleElements + 2, this.nbElements));
    } else {
      // Between
      return nh.concat([1, AsiPaginationComponent.TRI_POINT],
        this.createNumbersTab(currentPage - halfVisibleElement + 1, currentPage + halfVisibleElement - 1),
        [AsiPaginationComponent.TRI_POINT, this.nbElements]);
    }
  };

  createNumbersTab(min: number, max: number): Array<number> {
    let index = min - 1;
    return nh.times(max - min + 1, () => {
      return ++index;
    });
  }
}
