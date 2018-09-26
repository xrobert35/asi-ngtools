import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AsiNgToolsModule } from 'asi-ng-tools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AsiNgToolsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
