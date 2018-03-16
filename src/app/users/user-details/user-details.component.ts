import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../class/user';

@Component({
  selector: 'vawec-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetails: User;

  constructor(private userService: UsersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('data'));
    const id = this.activatedRoute.snapshot.params.id;
    this.userService.getUserById(token, id).subscribe(
      data => {
        this.userDetails = data.user["0"];
      },
      error => console.error('erreur', error)
    );

  }

}
