import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'vawec-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  invalidEmail = false;
  invalidCombinaison = false;

  cardTitle = 'Connection';
  cardButton = 'Connection';
  textLink = `Vous n'avez pas de compte ?`;

  constructor() { }

  ngOnInit() {
  }

  login(data) {
    console.log(data);

    if (!this.validateEmail(data.emailUser)) {
      this.invalidEmail = true;
    }

    if (this.validateEmail(data.emailUser) && data.passwordUser.length >= 5) {
      console.log(this.escapeHtml(data.emailUser));
      console.log(this.escapeHtml(data.passwordUser));
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
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
  }

}
