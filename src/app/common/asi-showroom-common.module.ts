import { CommonModule } from '@angular/common';
import { UtilsModule } from '@utils/utils.module';
import { NgModule } from '@angular/core';
import { AsiNgToolsModule } from '@asi-ngtools/lib';

@NgModule({
  imports: [
    UtilsModule,
    CommonModule,
    AsiNgToolsModule.forRoot(),
  ],
  exports: [
    UtilsModule,
    CommonModule,
    AsiNgToolsModule,
  ],
  providers: []
})
export class AsiShowroomCommonModule {

}
