import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class UniversalService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
  }

  isClientSide() {
    return !isPlatformServer(this.platformId);
  }

  isServerSide() {
    return isPlatformServer(this.platformId);
  }

}
