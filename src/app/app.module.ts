import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OffresModule } from './offres/offres.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OffresModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
