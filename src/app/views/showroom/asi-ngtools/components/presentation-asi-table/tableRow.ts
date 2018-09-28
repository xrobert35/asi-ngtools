import { Referentiel } from './../presentation-asi-select/referentiel';

export class TableRow {

  constructor(public col1: string,
    public col2: number,
    public col3: Date,
    public col4: any,
    public col5: Referentiel) {
  }
}
