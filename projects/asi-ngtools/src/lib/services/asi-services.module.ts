import { ModuleWithProviders, NgModule } from '@angular/core';

import { AsiSessionStorageService } from './asi-session-storage.service';
import { AsiPaginationService } from './asi-pagination.service';
import { AsiMomentService } from './asi-moment.service';
import { AsiFileService } from './asi-file.service';
import { AsiCssInjectorService } from './asi-css-injector.service';
import { AsiLocalStorageService } from './asi-local-storage.service';

export * from './asi-session-storage.service';
export * from './asi-local-storage.service';
export * from './asi-css-injector.service';
export * from './asi-file.service';
export * from './asi-moment.service';
export * from './asi-pagination.service';

const services = [AsiCssInjectorService,
  AsiFileService,
  AsiMomentService,
  AsiPaginationService,
  AsiSessionStorageService,
  AsiLocalStorageService];

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  entryComponents: [],
  providers: services
})
export class AsiServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiServicesModule,
      providers: services
    };
  }
}