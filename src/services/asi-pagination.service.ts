import { Injectable } from '@angular/core';

@Injectable()
export class AsiPaginationService {

  constructor() {

  }

  getNbPages(datas: Array<any>, nbElementParPage: number): number {
    return Math.ceil(datas.length / nbElementParPage);
  }

  getPage(datas: Array<any>, nbElementParPage: number, pageIndex: number): Array<any> {
    let results = new Array<any>();

    if (datas != null) {
      if (pageIndex < this.getNbPages(datas, nbElementParPage)) {
        results = datas.slice((pageIndex -1) * nbElementParPage, (pageIndex) * nbElementParPage);
      } else {
        results = datas.slice((pageIndex -1) * nbElementParPage);
      }
    }

    return results;
  }

}