import { Component, OnInit } from '@angular/core';
import { Offre } from '../class/offre';
import { OffresService } from '../offres.service';
import { ActivatedRoute } from '@angular/router';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { UsersService } from '../../users/users.service';
import { AgmCoreModule } from '@agm/core';

registerLocaleData (localeFr);

@Component({
  moduleId: module.id,
  selector: 'vawec-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  offreDetails: Offre;

  constructor(private offresService: OffresService, private userService: UsersService , private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.offresService.getOffreById(id).subscribe(
      data => {        
        this.offreDetails = data.offre["0"];
      },
      error => console.error('erreur', error)
    );

  }

}
