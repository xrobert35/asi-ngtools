import { AsiPaginationService } from './../../services/asi-pagination.service';
import { AsiTableSelectionModel } from './asi-table-config';
import { AsiTableRequest } from './asi-table-request';
import { AsiTableData } from './asi-table-data';
import { AsiTableColumn } from './asi-table-column.directive';
import { Component, QueryList, ContentChildren, AfterContentInit, Input, ViewChild, ElementRef, HostBinding } from '@angular/core';
import * as nh from '../../native-helper';

@Component({
  selector: 'asi-table',
  templateUrl: 'asi-table.component.html'
})
export class AsiTable<T> implements AfterContentInit {

  @HostBinding('class') class = 'asi-component asi-table';

  @ContentChildren(AsiTableColumn) queryColumns: QueryList<AsiTableColumn>;

  @Input() autoSort = false;
  @Input() autoPaginate = false;
  @Input() nbElementParPage = 25;
  @Input() selectionModel = new AsiTableSelectionModel('id', false);
  @Input() rowClass: any;
  @Input() fireRefreshOnInit = true;
  @Input() changePageOnTop = false;
  @Input() onRequestData: Function;

  @ViewChild('table') topElement: ElementRef;

  columns = new Array<AsiTableColumn>();

  data = new AsiTableData();

  searchDone = false;
  loading = false;

  sortedColumn: AsiTableColumn;

  noPaginateResults: Array<T>;

  // Show allcheck checkbox allchecked
  allChecked = false;

  constructor(private paginateService: AsiPaginationService) {
  }

  getColumns() {
    return nh.filter(this.columns, (column) => {
      return this.filtreColumn(column);
    });
  }

  getInlineColumns() {
    return nh.filter(this.columns, (column) => {
      return column.inlineColumn;
    });
  }

  private filtreColumn(column: AsiTableColumn): boolean {
    return (column.showIf == null || column.showIf) && (column.hideIf == null || !column.hideIf)
      && !column.inlineColumn;
  }

  getHeaderClass(column: AsiTableColumn) {
    let columnClass: any = {};
    if (column.columnClass) {
      if (column.columnClass instanceof Object) {
        // Copy
        columnClass = { ...column.columnClass }
      } else if (typeof column.columnClass === 'string') {
        columnClass['' + column.columnClass] = true;
      }
    }
    columnClass.sortable = column.sortable;
    columnClass.asc = column.asc;
    columnClass.desc = column.asc === false;
    return columnClass;
  }

  public fireRefresh() {
    this.data.pageIndex = 1;
    this.requestData();
    this.resetSelectionModel();
  }

  public updateData(data: AsiTableData<T>) {
    this.data = data;
    if (this.autoPaginate) {
      this.noPaginateResults = data.results;
      this.paginateDatas();
    } else {
      this.initCheckbox();
    }
    if (this.autoSort) {
      this.sortDatas();
    }
  }

  onSort(column: AsiTableColumn) {
    if (column.sortable) {

      if (this.sortedColumn != null && this.sortedColumn !== column) {
        this.sortedColumn.unsort();
      }

      this.sortedColumn = column;
      column.toggleSort();

      if (this.autoSort) {
        this.sortDatas();
      } else {
        this.requestData();
      }
    }
  }

  onPaginationChanged(pagination: number) {
    this.data.pageIndex = pagination;
    if (this.autoPaginate) {
      this.paginateDatas();
    } else {
      this.requestData();
    }

    if (this.changePageOnTop) {
      this.topElement.nativeElement.scrollIntoView();
    }
  }

  private paginateDatas() {
    this.data.results = this.paginateService.getPage(this.noPaginateResults, this.nbElementParPage, this.data.pageIndex);
    this.data.totalPages = this.paginateService.getNbPages(this.noPaginateResults, this.nbElementParPage);
    this.data.totalElements = this.noPaginateResults.length;
    this.initCheckbox();
  }

  private requestData() {
    let request = this.getAsiTableRequest();
    if (this.onRequestData) {
      Promise.resolve(this.onRequestData(request)).then((data: AsiTableData<T>) => {
        this.updateData(data);
      });
    }
  }

  private getAsiTableRequest(): AsiTableRequest {
    let request: AsiTableRequest = new AsiTableRequest();
    request.pageIndex = this.data.pageIndex;
    request.nbElementsParPage = this.nbElementParPage;
    if (this.sortedColumn != null) {
      request.tri = this.sortedColumn.getSortName();
      request.asc = this.sortedColumn.getAsc();
    }
    return request;
  }

  private sortDatas() {
    if (this.sortedColumn != null) {
      this.data.results = nh.orderBy(this.data.results, this.sortedColumn.getSortName(),
        this.sortedColumn.getAsc() ? 'asc' : 'desc');
      this.loading = false;
    }
  }

  /** Recupere la valeur à afficher pour une cellule */
  getCellValue(row: T, column: AsiTableColumn): any {
    return this.getProperty(row, column.name);
  }

  private getProperty(object: any, path: string): any {
    return nh.get(object, path);
  }

  initCheckbox() {
    this.columns.forEach((column) => {
      if (column.type === 'checkbox') {
        if (this.selectionModel.allChecked) {
          // If we are in allcheck mode we unselect excluded lines
          nh.forEach(this.data.results, (item: any) => {
            let itemId = this.getProperty(item, this.selectionModel.config.selectionId);
            const excluded = nh.find(this.selectionModel.itemsExcluded, (excludeditem) => {
              return this.matchRow(itemId, excludeditem);
            }) != null;
            item.checked = !excluded;
          });
        } else {
          // Else we select included lines
          nh.forEach(this.data.results, (item: any) => {
            let itemId = this.getProperty(item, this.selectionModel.config.selectionId);
            const included = nh.find(this.selectionModel.itemsIncluded, (includedItem) => {
              return this.matchRow(itemId, includedItem);
            }) != null;
            item.checked = included;
          });
        }
      }
    });
  }

  resetSelectionModel() {
    this.selectionModel.allChecked = false;
    this.selectionModel.nbItemsSelected = 0;
    this.selectionModel.itemsExcluded = [];
    this.selectionModel.itemsIncluded = [];
    this.initCheckbox();
  }

  onAllChecked(column: AsiTableColumn): void {
    this.selectionModel.allChecked = this.allChecked;

    this.selectionModel.itemsIncluded = [];
    this.selectionModel.itemsExcluded = [];

    nh.forEach(this.data.results, (data: any) => {
      data.checked = this.selectionModel.allChecked;
    });

    if (this.selectionModel.allChecked) {
      if (this.selectionModel.config.multipage) {
        this.selectionModel.nbItemsSelected = this.data.totalElements;
      } else {
        this.selectionModel.nbItemsSelected = this.data.results.length;
      }
    } else {
      this.selectionModel.nbItemsSelected = 0;
    }

    column.onAllChecked.emit(this.selectionModel.allChecked);
  }

  onChecked(row: any, column: AsiTableColumn): void {

    let rowId = this.getProperty(row, this.selectionModel.config.selectionId);

    if (this.selectionModel.allChecked) {
      if (row.checked) {
        nh.remove(this.selectionModel.itemsExcluded, (item) => {
          return this.matchRow(rowId, item);
        });
        this.selectionModel.nbItemsSelected++;
      } else {
        this.selectionModel.itemsExcluded.push(row);
        this.selectionModel.nbItemsSelected--;
      }
    } else {
      if (row.checked) {
        this.selectionModel.itemsIncluded.push(row);
        this.selectionModel.nbItemsSelected++;
      } else {
        nh.remove(this.selectionModel.itemsIncluded, (item) => {
          return this.matchRow(rowId, item);
        });
        this.selectionModel.nbItemsSelected--;
      }
    }

    column.onChecked.emit(row);
    this.updateAllChecked();
  }

  private matchRow(rowId: any, rowToMatch: any) {
    return rowId === this.getProperty(rowToMatch, this.selectionModel.config.selectionId);
  }

  private updateAllChecked() {
    if (this.selectionModel.config.multipage) {
      this.allChecked = this.selectionModel.nbItemsSelected === this.data.totalElements;
    } else {
      this.allChecked = this.selectionModel.nbItemsSelected === this.data.results.length;
    }
  }

  getRowClass(row: T) {
    if (row != null && this.rowClass != null) {
      if (this.isFunction(this.rowClass)) {
        return this.rowClass(row);
      } else {
        let rowClassStr = JSON.stringify(this.rowClass);
        rowClassStr = nh.replace(rowClassStr, new RegExp('{row}', 'g'), 'row');
        // tslint:disable-next-line:quotemark
        rowClassStr = nh.replace(rowClassStr, new RegExp("'", 'g'), '"');
        let jsonRowClass: any = JSON.parse(rowClassStr);
        for (let key in jsonRowClass) {
          if (jsonRowClass.hasOwnProperty(key)) {
            // tslint:disable-next-line:no-eval
            jsonRowClass[key] = eval(jsonRowClass[key]);
          }
        }
        return jsonRowClass;
      }
    }
  }

  private isFunction(functionToCheck: Function) {
    const getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  ngAfterContentInit() {
    this.queryColumns.forEach(column => {
      this.columns.push(column)
    });
    if (this.fireRefreshOnInit) {
      this.requestData();
      this.resetSelectionModel();
    }
  }
}
