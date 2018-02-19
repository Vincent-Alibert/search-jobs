import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FormsModule } from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';
import { RouterModule } from '@angular/router';
import { CompteComponent } from './compte/compte.component';
import { UsersService } from './users.service';
import { NotFoundComponent } from '../not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    AuthentificationComponent,
    InscriptionComponent,
    CompteComponent,
    NotFoundComponent
  ],
  exports: [
    AuthentificationComponent,
    NotFoundComponent
  ],
  providers: [UsersService]
})
export class UsersModule { }
