import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import * as jwtDecode from 'jwt-decode';


@Component({
  moduleId: module.id,
  selector: 'vawec-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  invalidEmail = false;
  invalidCombinaison = false;

  error = false;
  errorMsg: string;

  cardTitle = 'Connection';
  cardButton = 'Connection';
  textLink = `Vous n'avez pas de compte ?`;

  decryptToken: any;

  constructor(private _usersService: UsersService, private router: Router) { }

  ngOnInit() {
  }

  login(dataForm) {
    dataForm.passwordUser = Md5.hashStr(dataForm.passwordUser);
    if (!this.validateEmail(dataForm.emailUser.trim())) {
      this.invalidEmail = true;
    }
    if (this.validateEmail(dataForm.emailUser.trim())) {
      this._usersService.login(dataForm).subscribe(
        dataServ => {
          if (dataServ.hasOwnProperty('result')) {
            if (dataServ.result.status === 'error') {
              this.error = true;
              this.invalidEmail = false;
              this.errorMsg = dataServ.result.user;
            }
          }
          if (dataServ.hasOwnProperty('token')) {
            this.decryptToken = this.decodeToken(dataServ.token);
            this.error = false;
            this._usersService.setCurrentUser(this.decryptToken.value.user['0']);
            localStorage.setItem('data', JSON.stringify(dataServ.token));
            this.router.navigate(['/compte']);
          }
          // décrypter le token puis traiter ci dessous
        },
        error => {
          this.error = true;
          this.invalidEmail = false;
          this.errorMsg = error.result.user;
        }
      );
    }

  }

  decodeToken(token) {
    return jwtDecode(token);
  }

  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  /*html specialchars en js */
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
  }

}
