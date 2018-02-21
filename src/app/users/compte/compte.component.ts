import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../class/user';
import { OffresService } from '../../offres/offres.service';

@Component({
  moduleId: module.id,
  selector: 'vawec-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UsersService, private offreService: OffresService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    this.offreService.getOffresSendById(this.currentUser.idUser).subscribe(
      data => console.log('data', data),
      error => console.log('error', error)
    );

  }

}
