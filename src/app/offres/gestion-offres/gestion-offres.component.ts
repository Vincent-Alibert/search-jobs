import { Component, OnInit } from '@angular/core';
import { OffresService } from '../offres.service';

@Component({
  moduleId: module.id,
  selector: 'vawec-gestion-offres',
  templateUrl: './gestion-offres.component.html',
  styleUrls: ['./gestion-offres.component.scss']
})
export class GestionOffresComponent implements OnInit {

  constructor(private offresService: OffresService) { }

  ngOnInit() {
    
  }

}