import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../class/user';

@Component({
  moduleId: module.id,
  selector: 'vawec-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.scss']
})
export class GestionUserComponent implements OnInit {

  users: User[];
  constructor(private userService: UsersService) { }

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('data'));
    this.userService.getAllUser(token).subscribe(
      data => {         
        this.users = data.user
      },
      error => console.log(error)
    )
  }

}
