import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';


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

  constructor(private _usersService: UsersService, private router: Router) { }

  ngOnInit() {
  }

  login(dataForm) {

    console.log(dataForm);

    dataForm.passwordUser = Md5.hashStr(dataForm.passwordUser);

    if (!this.validateEmail(dataForm.emailUser.trim())) {
      this.invalidEmail = true;
    }
    if (this.validateEmail(dataForm.emailUser.trim())) {

      console.log(dataForm);

      this._usersService.login(dataForm).subscribe(
        dataServ => {
          console.log('dataServ ', dataServ);
          console.log('dataServ.result.status ', dataServ.result.status);

          if (dataServ.result.status === 'success') {
            this.error = false;
            this.router.navigate(['/compte']);
          } else {
            this.error = true;
            this.invalidEmail = false;
            this.errorMsg = dataServ.result.user;
          }
        },
        error => console.log(`error = ${error}`)
      );
    }

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
