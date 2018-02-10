import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOffresComponent } from './list-offres/list-offres.component';
import { SearchOffresComponent } from './search-offres/search-offres.component';
import { OffresService } from './offres.service';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ListOffresComponent, SearchOffresComponent, DetailsComponent],
  imports: [
    CommonModule
  ],
  exports: [ListOffresComponent, SearchOffresComponent],
  providers: [OffresService]
})
export class OffresModule { }
