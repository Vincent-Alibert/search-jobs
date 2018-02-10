import { Component, OnInit } from '@angular/core';
import { Offre } from '../classe/offre';
import { OffresService } from '../offres.service';


@Component({
  selector: 'vawec-list-offres',
  templateUrl: './list-offres.component.html',
  styleUrls: ['./list-offres.component.scss']
})

export class ListOffresComponent implements OnInit {

  private offres: Offre[];
  private error: string;

  constructor(private offresService: OffresService) { }

  ngOnInit() {
    this.offresService.getAllOffres().subscribe(
      data => { console.log(data);
        if (data.status === 'success') {
          this.offres = data.offre;
        } else {
          this.error = `Une erreur s'est produite veuillez nous excuser`;
        }
      },
      error => {
        console.log('error', error);
        this.error = `Une erreur s'est produite veuillez nous excuser. Erreur : ${error}`;
      }
    );
  }

}
