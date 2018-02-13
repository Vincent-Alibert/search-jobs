import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { OffresModule } from './offres/offres.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './offres/details/details.component';
import { ListOffresComponent } from './offres/list-offres/list-offres.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersModule } from './users/users.module';
import { AuthentificationComponent } from './users/authentification/authentification.component';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'offres/:id', component: DetailsComponent },
  { path: 'offres', component: ListOffresComponent },
  { path: 'connection', component: AuthentificationComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    OffresModule,
    UsersModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
