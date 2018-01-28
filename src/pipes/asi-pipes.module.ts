import { AsiDatePipe } from './asi-date.pipe';
import { AsiServicesModule } from './../services/asi-services.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IntArrayPipe } from './intArray.pipe';
import { AsiConcatPipe } from './asi-concat.pipe';
import { AsiFilterPipe } from './asi-filter.pipe';
import { AsiConcatTranslatePipe } from "./asi-concat-translate.pipe";

export * from './intArray.pipe';
export * from './asi-concat.pipe';
export * from './asi-filter.pipe';
export * from "./asi-concat-translate.pipe";
export * from './asi-date.pipe';


const sharedDeclarations = [AsiFilterPipe, AsiConcatPipe, AsiDatePipe, AsiConcatTranslatePipe, IntArrayPipe];

@NgModule({
  declarations: [...sharedDeclarations],
  imports: [AsiServicesModule.forRoot()],
  exports: [...sharedDeclarations],
  entryComponents: [],
  providers: []
})
export class AsiPipesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiPipesModule,
      providers: []
    };
  }
}