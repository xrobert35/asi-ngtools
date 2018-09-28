import { Referentiel } from './../../referentiel';

export class TableRow {

  col1: string;
  col2: number;
  col3: Date;
  col4 : Referentiel

  constructor(col1: string, col2: number, col3: Date, col4 : Referentiel) {
    this.col1 = col1;
    this.col2 = col2;
    this.col3 = col3;
    this.col4 = col4;
  }
}