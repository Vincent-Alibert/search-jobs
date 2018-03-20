import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { UsersService } from '../users/users.service';

@Injectable()
export class OffresService {

  private ROUTE = 'http://localhost:4201/api/v1';

  constructor(private _http: Http, private userService: UsersService) { }

  /**
   * récupère toutes les offres
   */
  getAllOffres() {
    return this._http.get(this.ROUTE + '/offres')
      .map(res => res.json());
  }

  /**
   * Récupère les offres par Id de l'entreprise
   * @param id 
   */
  getOffresSendById(id: number) {
    return this._http.get(this.ROUTE + `/offres/send/${id}`)
      .do(res => console.log(res));
  }

  /**
   * 
   * @param FormData 
   * @param token 
   */
  addOffre(FormData, token) {
    const requestOptions = this.userService.addAuthHeader(token);
    return this._http.post(this.ROUTE + '/offres/add', FormData, requestOptions)
      .map(res => res.json());
  }

  /**
   * Récupère les candidatures par l'id de l'utilisateur
   * @param idUser 
   */
  getOffreByCandidatureId(idUser: number) {
    return this._http.get(this.ROUTE + `/candidatures/${idUser}`)
      .map(res => res.json());
  }
}
