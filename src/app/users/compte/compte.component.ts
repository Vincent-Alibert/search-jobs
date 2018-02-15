import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  moduleId: module.id,
  selector: 'vawec-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  constructor(private _userService: UsersService) { }

  ngOnInit() {
    this._userService.currentUser.subscribe(
      data => console.log('compte data' , data)
    );
  }

}
