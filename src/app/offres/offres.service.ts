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

  getOffreById(id) {
    return this._http.get(this.ROUTE + `/offres/details/${id}`)
      .map(res => res.json());
  }

   /**
   * Récupère les offres par l'id de l'utilisateur
   * @param idUser 
   */
  getOffreByIdUser(idUser: number) {
    return this._http.get(this.ROUTE + `/offres/user/${idUser}`)
      .map(res => res.json());
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
   * 
   * @param idOffre 
   * 
   */
  deleteOffre(idOffre: number) {
    const data = {idOffre};
    return this._http.post(this.ROUTE + '/offres/delete', data)
      .map(res => res.json());
  }

  /**
   * Récupère les candidatures par l'id de l'utilisateur
   * @param idUser 
   */
  getCandidatureByIdFirm(idUser: number) {
    return this._http.get(this.ROUTE + `/candidatures/firm/${idUser}`)
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

  selectOffre(idUser: number, idOffre: number) {
    return this._http.get(this.ROUTE + `/candidatures/${idUser}/select/${idOffre}`)
      .map(res => res.json());
  }

  unSelectOffre(idUser: number, idOffre: number) {
    return this._http.get(this.ROUTE + `/candidatures/${idUser}/unselect/${idOffre}`)
      .map(res => res.json());
  }

}
