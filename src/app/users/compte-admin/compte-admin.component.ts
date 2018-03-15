import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'vawec-compte-admin',
  templateUrl: './compte-admin.component.html',
  styleUrls: ['./compte-admin.component.scss']
})
export class CompteAdminComponent implements OnInit {

  errorData: boolean;
  compteNombreUser: number;
  compteNombreFirm: number;
  compteNombreOffre: number;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    if (this.userService.userIsAuthenticated) {
      if (this.userService.userIsAdmin()) {
        const token = JSON.parse(localStorage.getItem('data'));
        this.userService.countData(token).subscribe(
          data => {
            if (data.hasOwnProperty('result')) {
              if (data.result.status === 'success') {
                this.errorData = false;
                this.compteNombreUser = data.result.countData["0"].nombreUser;
                this.compteNombreFirm = data.result.countData["0"].nombreFirm;
                this.compteNombreOffre = data.result.countData["0"].nombreOffre;
              } else {
                this.errorData = true;
              }
            } else {
              this.errorData = true;
            }
          }
        );
      }
    }
  }

}
