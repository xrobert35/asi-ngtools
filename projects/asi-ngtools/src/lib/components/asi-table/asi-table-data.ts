
export class AsiTableData<T> {
  pageIndex = 1;
  results: Array<T> = null;
  totalElements = 0;
  totalPages = 0;
  paginate = false;

  constructor() {
  }
}
