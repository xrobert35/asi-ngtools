import { ModuleWithProviders, NgModule } from '@angular/core';

export * from './asi-validators';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  entryComponents: [],
  providers: []
})
export class AsiValidatorsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsiValidatorsModule,
      providers: []
    };
  }
}