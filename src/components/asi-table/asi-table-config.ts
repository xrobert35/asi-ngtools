export class AsiTableSelectionModel {
  nbItemsSelected: number = 0;
  itemsIncluded: Array<any> = [];
  itemsExcluded: Array<any> = [];
  allChecked: boolean = false;
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