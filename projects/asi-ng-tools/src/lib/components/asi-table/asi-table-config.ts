export class AsiTableSelectionModel {
  nbItemsSelected = 0;
  itemsIncluded: Array<any> = [];
  itemsExcluded: Array<any> = [];
  allChecked = false;
  config: {
    selectionId: string;
    multipage: boolean;
  }

  constructor(selectionId: string, multipage: boolean) {
    this.config = {
      selectionId: selectionId,
      multipage: multipage
    };
  }
}
