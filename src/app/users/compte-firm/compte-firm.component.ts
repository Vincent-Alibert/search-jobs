import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../class/user';
import { OffresService } from '../../offres/offres.service';

@Component({
  moduleId: module.id,
  selector: 'vawec-compte-firm',
  templateUrl: './compte-firm.component.html',
  styleUrls: ['./compte-firm.component.scss']
})
export class CompteFirmComponent implements OnInit {

  @Input() data: User;

  currentUser: User;
  offres: any[];
  candidatures: any[];
  showCandidature = false;
  showMyOffres = true;
  alerteMessage = "Êtes-vous sûr de vouloir supprimer cette offre ?";

  constructor(private usersService: UsersService, private offreService: OffresService) { }


  ngOnInit() {
    this.currentUser = this.data;
    this.offreService.getOffreByIdUser(this.currentUser.idUser).subscribe(
      data => {
        if (data.status === "success") {
          this.offres = data.offre;
          this.offres.map(obj => {
            obj.alerteDelete = false;
          })
        }
      },
      error => console.log('error', error)
    )
    this.offreService.getCandidatureByIdFirm(this.currentUser.idUser).subscribe(
      data => {
        console.log('data', data);
        if (data.status === "success") {
          this.candidatures = data.candidature;
        }
      },
      error => console.log('errorCandidature', error)
    )
  }

  valideDelete(idOffre: number) {
    this.offreService.deleteOffre(idOffre).subscribe(
      data => {
        console.log('data', data);
        if (data.result.status === "success") {
          this.offres = this.offres.filter(
            (offre) => { return offre.idOffre !== idOffre }
          );
        }
      }
    )
  }
  showingCandidature() {
    this.showCandidature = true;
    this.showMyOffres = false;
    this.offreService.getCandidatureByIdFirm(this.currentUser.idUser).subscribe(
      data => {
        if (data.status === "success") {
          this.candidatures = data.candidature;
        }
      },
      error => console.log('error', error)
    )
  }
  showingMyOffre() {
    this.showCandidature = false;
    this.showMyOffres = true;
  }

  count(id: number) {
    console.log('id', id);

    var current = null;
    var number = 0;
    for (let index = 0; index < this.candidatures.length; index++) {
      let element = this.candidatures[index];
      console.log('element.idOffre',element.idOffre);
      console.log('number', number);
      
      if (element.idOffre == id) {
        number++;
        console.log('number++', number);
      }

    }
    console.log('****************************');
    
    return number;
  }
}
