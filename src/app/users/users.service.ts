import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { User } from './class/user';
import { Router } from '@angular/router';

import * as jwtDecode from 'jwt-decode';

@Injectable()
export class UsersService {

  private ROUTE = 'http://localhost:4201/api/v1';

  currentUser: User;
  private isAdmin = false;
  private isFirm = false;
  private isMember = false;
  isAuthenticated = false;

  private decryptToken: any;

  error = false;

  constructor(private _http: Http, private router: Router) { }

  addAuthHeader(token) {
    const authorizationHeader = new Headers({
      'Authorization': 'Bearer ' + token
    });
    return new RequestOptions({ headers: authorizationHeader });
  }

  decodeToken(token) {
    return jwtDecode(token);
  }
  
  login(data) {
    return this._http.post(this.ROUTE + '/login', data)
      .map(res => res.json());
  }

  addUser(FormData) {
    return this._http.post(this.ROUTE + '/users/add', FormData)
      .map(res => res.json());
  }

  countData(token) {
    const requestOptions = this.addAuthHeader(token);
    return this._http.get(this.ROUTE + '/users/count-data', requestOptions)
      .map(res => res.json());

  }

  getAllUser(token) {
    const requestOptions = this.addAuthHeader(token);
    return this._http.get(this.ROUTE + '/users', requestOptions)
      .map(res => res.json());
  }

  getUserById(token,id) {
    const requestOptions = this.addAuthHeader(token);
    return this._http.get(this.ROUTE + `/users/${id}`, requestOptions)
      .map(res => res.json());
  }

  setCurrentUser() {

    if (this.userIsLoggedIn()) {
      this.decryptToken = this.decodeToken(localStorage.getItem('data'));
      this.currentUser = this.decryptToken.value.user['0'];
      if (this.currentUser !== undefined && this.currentUser.administrateur === 1) {
        this.isAdmin = true;
        this.isFirm = false;
        this.isMember = false;
        this.isAuthenticated = true;
      } else if (this.currentUser !== undefined && this.currentUser.entreprise === 1) {
        this.isAdmin = false;
        this.isFirm = true;
        this.isMember = false;
        this.isAuthenticated = true;
      } else if (this.currentUser !== undefined && this.currentUser.administrateur === 0 && this.currentUser.entreprise === 0) {
        this.isAdmin = false;
        this.isFirm = false;
        this.isMember = true;
        this.isAuthenticated = true;
      }
    } else {
      this.currentUser = undefined;
    }

  }


  userIsLoggedIn() {
    return !!localStorage.getItem('data');
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
