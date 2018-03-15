import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';
import { RouterModule } from '@angular/router';
import { CompteComponent } from './compte/compte.component';
import { UsersService } from './users.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CompteAdminComponent } from './compte-admin/compte-admin.component';
import { CompteFirmComponent } from './compte-firm/compte-firm.component';
import { CompteUserComponent } from './compte-user/compte-user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthentificationComponent,
    InscriptionComponent,
    CompteComponent,
    NotFoundComponent,
    CompteAdminComponent,
    CompteFirmComponent,
    CompteUserComponent
  ],
  exports: [
    AuthentificationComponent,
    NotFoundComponent
  ],
  providers: [UsersService]
})
export class UsersModule { }
