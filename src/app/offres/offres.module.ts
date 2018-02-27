import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOffresComponent } from './list-offres/list-offres.component';
import { SearchOffresComponent } from './search-offres/search-offres.component';
import { OffresService } from './offres.service';
import { DetailsComponent } from './details/details.component';
import { AddOffreComponent } from './add-offre/add-offre.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListOffresComponent,
    SearchOffresComponent,
    DetailsComponent,
    AddOffreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListOffresComponent,
    SearchOffresComponent
  ],
  providers: [OffresService]
})
export class OffresModule { }
