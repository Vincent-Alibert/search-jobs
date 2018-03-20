import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './offres/details/details.component';
import { ListOffresComponent } from './offres/list-offres/list-offres.component';
import { AuthentificationComponent } from './users/authentification/authentification.component';
import { InscriptionComponent } from './users/inscription/inscription.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CompteComponent } from './users/compte/compte.component';
import { AddOffreComponent } from './offres/add-offre/add-offre.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'offres/add', component: AddOffreComponent },
  { path: 'offres/details/:id', component: DetailsComponent },
  { path: 'offres', component: ListOffresComponent },
  { path: 'connection', component: AuthentificationComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'compte/modifications/:id', component: UserDetailsComponent },
  { path: 'compte/details/:id', component: UserDetailsComponent },
  { path: 'compte', component: CompteComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule { }
