import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { UsersService } from '../users/users.service';

@Injectable()
export class OffresService {

  private ROUTE = 'http://localhost:4201/api/v1';

  constructor(private _http: Http, userService: UsersService) { }

  getAllOffres() {
    return this._http.get(this.ROUTE + '/offres')
      .map(res => res.json());
  }

  getOffresSendById(id: number) {
    return this._http.get(this.ROUTE + '/offres/send/:id')
              .do( res => console.log(res));
  }

}
