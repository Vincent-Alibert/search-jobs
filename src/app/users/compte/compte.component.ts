import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../class/user';

@Component({
  moduleId: module.id,
  selector: 'vawec-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  currentUser: User;
  compteNombreUser: number;
  compteNombreFirm: number;
  compteNombreOffre: number;
  errorData: Boolean;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
  }

}
