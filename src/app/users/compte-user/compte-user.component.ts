import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../class/user';
import { Offre } from '../../offres/class/offre';
import { OffresService } from '../../offres/offres.service';

@Component({
  moduleId: module.id,
  selector: 'vawec-compte-user',
  templateUrl: './compte-user.component.html',
  styleUrls: ['./compte-user.component.scss']
})
export class CompteUserComponent implements OnInit {

  @Input() data: User;

  currentUser: User;
  offres: Offre[];

  constructor(private usersService: UsersService, private offreService: OffresService) { }

  ngOnInit() {
    this.currentUser = this.data;
    this.offreService.getOffreByCandidatureId(this.currentUser.idUser).subscribe(
      data => {
        if (data.status === "success") {
          this.offres = data.candidature
        }
      },
      error => console.log('error', error)
    )
  }
  selection(event) {
    if (event.target.checked) {
      this.offreService.selectOffre(this.currentUser.idUser, event.target.id).subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);

        }
      )
    } else {
      this.offreService.unSelectOffre(this.currentUser.idUser, event.target.id).subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);

        }
      )
    }
  }

}
