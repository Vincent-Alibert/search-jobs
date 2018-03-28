import { Component, OnInit } from '@angular/core';
import { Offre } from '../class/offre';
import { OffresService } from '../offres.service';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/class/user';


@Component({
  moduleId: module.id,
  selector: 'vawec-list-offres',
  templateUrl: './list-offres.component.html',
  styleUrls: ['./list-offres.component.scss']
})

export class ListOffresComponent implements OnInit {

  private offres: Offre[];
  private error: string;
  private currentUser: User;

  constructor(private offresService: OffresService, private userService: UsersService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    this.offresService.getAllOffres().subscribe(
      data => {
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

  selection(event) {
    if (event.target.checked) {
      this.offresService.selectOffre(this.currentUser.idUser, event.target.id).subscribe();
    } else {
      this.offresService.unSelectOffre(this.currentUser.idUser, event.target.id).subscribe();
    }
  }

}
