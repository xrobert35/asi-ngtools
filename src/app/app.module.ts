import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ViewsRoutingModule } from './views/views.router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { UniversalService } from '@common/utils/universal.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateUniversalLoader } from '@common/utils/universal.loader';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

const translateLoader = (transferState: TransferState, universalService: UniversalService, httpClient: HttpClient) => {
  return new TranslateUniversalLoader(transferState, universalService.isServerSide(), httpClient);
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'universal-cli' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    ViewsRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoader,
        deps: [TransferState, UniversalService, HttpClient]
      }
    })
  ],
  exports : [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('fr');
  }
}
