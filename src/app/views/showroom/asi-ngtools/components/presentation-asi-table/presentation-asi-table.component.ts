import { AsiTableData, AsiTableRequest } from '@asi-ngtools/lib';
import { AsiTable, AsiTableSelectionModel } from '@asi-ngtools/lib';
import { TableRow } from './tableRow';
import { Component, ViewChild, HostBinding } from '@angular/core';
import { Referentiel } from '../presentation-asi-select/referentiel';

@Component({
  selector: 'presentation-asi-table',
  templateUrl: './presentation-asi-table.component.html',
})
export class PresentationAsiTableComponent {

  @HostBinding('class') class = 'flex';

  @ViewChild(AsiTable) asiTable: AsiTable<TableRow>;

  mySelectionModel = new AsiTableSelectionModel('col2', true);

  checked: boolean;

  constructor() {}

  isChecked() {
    return false;
  }

  // Add class 'row-class'  if the number of selected item is >= 2
  rowClassMethod() {
    return this.mySelectionModel.nbItemsSelected >= 2;
  }

  // arrow function else "this" would be the AsiTableComponent
  refreshTable = async (_tableRequest: AsiTableRequest) => {
    const asiTableData = new AsiTableData<TableRow>();

    const results = new Array<TableRow>();
    for (let index = 0; index < 100; index++) {
      results.push(new TableRow(' Row ' + index, index, null, null, new Referentiel('code-' + index, 'libelle-' + index)));
    }

    // Working with async
    // const results = await this.myService.getData(tableRequest.pageIndex, tableRequest.nbElementsParPage);

    asiTableData.results = results;
    asiTableData.paginate = true;

    // reset the selection model if you need to
    this.mySelectionModel = new AsiTableSelectionModel('col2', true);

    return asiTableData;
  }
}
