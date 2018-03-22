import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOffresComponent } from './list-offres/list-offres.component';
import { SearchOffresComponent } from './search-offres/search-offres.component';
import { OffresService } from './offres.service';
import { DetailsComponent } from './details/details.component';
import { AddOffreComponent } from './add-offre/add-offre.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

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
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDAxdDncvYE6e8hejC4ZkrzxRcU3JKq8fk'
    })
  ],
  exports: [
    ListOffresComponent,
    SearchOffresComponent
  ],
  providers: [OffresService]
})
export class OffresModule { }
