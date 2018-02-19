import { Component } from '@angular/core';
import { UsersService } from './users/users.service';
import { User } from './users/class/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Search Job';

  constructor(private userService: UsersService) {
    if (this.userService.currentUser === undefined && localStorage.getItem('data')) {
      this.userService.setCurrentUser();
    }
  }

}
