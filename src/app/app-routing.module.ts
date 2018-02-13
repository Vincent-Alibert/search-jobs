import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './offres/details/details.component';
import { ListOffresComponent } from './offres/list-offres/list-offres.component';
import { AuthentificationComponent } from './users/authentification/authentification.component';
import { InscriptionComponent } from './users/inscription/inscription.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'offres/:id', component: DetailsComponent },
  { path: 'offres', component: ListOffresComponent },
  { path: 'connection', component: AuthentificationComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
