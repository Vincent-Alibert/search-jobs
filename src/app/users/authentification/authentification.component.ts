import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

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

    if (!this.validateEmail(dataForm.emailUser.trim())) {
      this.invalidEmail = true;
    }
    if (this.validateEmail(dataForm.emailUser.trim())) {
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
