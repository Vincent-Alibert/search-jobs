import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { User } from './class/user';
import { Router } from '@angular/router';

@Injectable()
export class UsersService {

  private ROUTE = 'http://localhost:4201/api/v1';

  private currentUser: User;
  private isAdmin = false;
  private isFirm = false;
  private isMember = false;
  private isAuthenticated = false;

  constructor(private _http: Http, private router: Router) { }

  login(data) {
    return this._http.post(this.ROUTE + '/login', data)
      .map(res => res.json());
  }

  setCurrentUser(user) {
    this.currentUser = user;
    if (this.currentUser != null && this.currentUser.administrateur === 1) {
      this.isAdmin = true;
      this.isFirm = false;
      this.isMember = false;
      this.isAuthenticated = true;
    } else if (this.currentUser != null && this.currentUser.entreprise === 1) {
      this.isAdmin = false;
      this.isFirm = true;
      this.isMember = false;
      this.isAuthenticated = true;
    } else if (this.currentUser != null && this.currentUser.administrateur === 0 && this.currentUser.entreprise === 0) {
      this.isAdmin = false;
      this.isFirm = false;
      this.isMember = true;
      this.isAuthenticated = true;
    }

  }

  userIsLoggedIn() {
    return localStorage.getItem('data');
  }

  logOut() {
    localStorage.removeItem('data');
    this.currentUser = null;
    this.isAdmin = false;
    this.isFirm = false;
    this.isMember = false;
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }

  getCurrentUser() {
    return this.currentUser;
  }
  userIsAuthenticated() {
    return this.isAuthenticated;
  }

  userIsAdmin() {
    return this.isAdmin;
  }

  userIsMember() {
    return this.isMember;
  }

  userIsFirm() {
    return this.isFirm;
  }

}
