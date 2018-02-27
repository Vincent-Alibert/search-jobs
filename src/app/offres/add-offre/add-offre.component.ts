import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffresService } from '../offres.service';
import { Offre } from '../class/offre';

@Component({
  selector: 'vawec-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.scss']
})
export class AddOffreComponent implements OnInit {

  formAddOffre: FormGroup;
  offre = Offre;
  ajoutIsOk: boolean;

  constructor(private offresService: OffresService, private userService: UsersService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formAddOffre = this.formBuilder.group({
      offre: this.formBuilder.group({
        titreOffre: ['', Validators.required],
        dateDebutPoste: ['', [Validators.required, Validators.pattern('(asap)|([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))')]],
        introduction: ['', Validators.required],
        description: ['', Validators.required],
        latittude: ['', [Validators.required, Validators.pattern('^[+-]?[0-9]+(\.[0-9]+)?')]],
        longitude: ['', [Validators.required, Validators.pattern('^[+-]?[0-9]+(\.[0-9]+)?')]],
        rueOffre: ['', Validators.required],
        codePostalOffre: ['', Validators.required],
        villeOffre: ['', Validators.required],
        salaireOffre: ['', Validators.required]
      })
    });
  }
  addOffre(formData) {
    console.log('formData', formData);
    this.offresService.addOffre(formData).subscribe(
      data => {
        console.log('data', data);
      }
    )
  }

}