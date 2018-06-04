import { Component, OnInit } from '@angular/core';
import { Offre } from '../class/offre';
import { OffresService } from '../offres.service';
import { UsersService } from '../../users/users.service';


@Component({
  moduleId: module.id,
  selector: 'vawec-search-offres',
  templateUrl: './search-offres.component.html',
  styleUrls: ['./search-offres.component.scss']
})
export class SearchOffresComponent implements OnInit {

  offres = [];
  searchResult = false;
  number = null;

  constructor(private offresService: OffresService, private userService: UsersService) { }

  ngOnInit() {
  }

  searchJobs(searchData) {
    this.offresService.searchOffre(searchData).subscribe(
      data=> {
        this.offres = data.jobs
        this.number = this.offres.length;
        this.searchResult = true;
      },
      err => console.log(err)
    )
  }

}
