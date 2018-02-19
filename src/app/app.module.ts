import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { OffresModule } from './offres/offres.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
// import { NotFoundComponent } from './not-found/not-found.component';
import { UsersModule } from './users/users.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    OffresModule,
    UsersModule,
    AppRoutingModule
  ],
  // exports: [NotFoundComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
