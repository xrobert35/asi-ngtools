import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsiNgToolsBaseModule } from './../../asi-ngtools-base.module';
import { AsiTableInliner } from './asi-table-inliner.directive';
import { AsiTableColumn } from './asi-table-column.directive';
import { AsiPaginationService } from './../../services/asi-pagination.service';
import { AsiCheckBoxModule } from './../asi-checkbox/asi-checkbox.module';
import { AsiPaginationModule } from './../asi-pagination/asi-pagination.module';
import { AsiTable } from './asi-table.component';

export * from './../../asi-ngtools-base.module';
export * from './../asi-pagination/asi-pagination.module';
export * from './../asi-checkbox/asi-checkbox.module';
export * from './../../services/asi-pagination.service';

export * from './asi-table-data';
export * from './asi-table-request';
export * from './asi-table-config';

export * from './asi-table.component';
export * from './asi-table-inliner.directive';
export * from './asi-table-column.directive';

@NgModule({
  declarations: [AsiTable, AsiTableColumn, AsiTableInliner],
  imports: [AsiNgToolsBaseModule.forRoot(), AsiPaginationModule.forRoot(), AsiCheckBoxModule.forRoot()],
  exports: [AsiNgToolsBaseModule, AsiTable, AsiTableColumn, AsiTableInliner],
  entryComponents: [],
  providers: [AsiPaginationService]
})
export class AsiTableModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiTableModule,
      providers: [AsiPaginationService]
    };
  }
}