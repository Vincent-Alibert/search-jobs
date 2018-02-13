import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UsersService {

  private ROUTE = 'http://localhost:4201/api/v1';

  constructor(private _http: Http) { }

  login(data) {
    return this._http.post(this.ROUTE + '/login', data)
                      .map(res => res.json());
  }

}
