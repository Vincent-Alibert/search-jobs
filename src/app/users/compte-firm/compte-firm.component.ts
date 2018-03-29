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
  }

  valideDelete(idOffre: number) {
    this.offreService.deleteOffre(idOffre).subscribe(
      data => {
        if (data.status === "success") {
          // this.offres = this.offres.filter(
          //   (offre) => { return offre.idOffre !== id }
          // );
        }
      }
    )
  }

}
