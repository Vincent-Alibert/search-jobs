import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  moduleId: module.id,
  selector: 'vawec-compte-admin',
  templateUrl: './compte-admin.component.html',
  styleUrls: ['./compte-admin.component.scss']
})
export class CompteAdminComponent implements OnInit {

  showStat = true;
  showGestionUser = false;
  showGestionFirm = false;
  showGestionOffres = false;

  constructor() { }

  ngOnInit() {
  }

  showingStat() {
    this.showStat = true;
    this.showGestionFirm = false;
    this.showGestionUser = false;
    this.showGestionOffres = false;
  }

  showingUser() {
    this.showStat = false;
    this.showGestionFirm = false;
    this.showGestionUser = true;
    this.showGestionOffres = false;
  }

  showingOffres() {
    this.showStat = false;
    this.showGestionFirm = false;
    this.showGestionUser = false;
    this.showGestionOffres = true;
  }

  showingFirm() {
    this.showStat = false;
    this.showGestionFirm = true;
    this.showGestionUser = false;
    this.showGestionOffres = false;
  }

}
