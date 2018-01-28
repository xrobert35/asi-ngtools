
export class AsiTableData<T>{
  pageIndex: number = 1;
  results: Array<T> = null;
  totalElements: number = 0;
  totalPages: number = 0;
  paginate: boolean = false;

  constructor() {
  }
}