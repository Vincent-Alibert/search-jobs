import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../class/user';
import { UsersService } from '../users.service';
import { Md5 } from 'ts-md5/dist/md5';

/* function here */

@Component({
  moduleId: module.id,
  selector: 'vawec-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  formInscription: FormGroup;
  user = User;
  samePassword = true;
  inscriptionIsOk: boolean;

  constructor(private formBuilder: FormBuilder, private _usersService: UsersService) { }

  ngOnInit() {
    this.formInscription = this.formBuilder.group({
      user: this.formBuilder.group({
        nomUser: ['', Validators.required],
        prenomUser: ['', Validators.required],
        mailUser: ['', [Validators.email, Validators.required]],
        passwordUser: ['', [Validators.required]],
        passwordVerify: ['', [Validators.required]],
        dateInscription: new Date(),
        rueUser: ['', Validators.required],
        codePostalUser: ['', Validators.required],
        villeUser: ['', Validators.required],
        nomEnt: ['', null],
        latitudeEnt: ['', null],
        longitudeEnt: ['', null],
        photoUser: '/public/images/photos/',
        imageUser: '/public/images/fonds/',
        administrateur: 0,
        entreprise: ['', Validators.required]
      })
    });

    this.formInscription.get('user.entreprise').valueChanges.subscribe(
      (entreprise: string) => {
        if (entreprise === '1') {
          this.formInscription.get('user.nomEnt').setValidators([Validators.required]);
          this.formInscription.get('user.latitudeEnt').setValidators([Validators.required, Validators.pattern('^[+-]?[0-9]+(\.[0-9]+)?')]);
          this.formInscription.get('user.longitudeEnt').setValidators([Validators.required, Validators.pattern('^[+-]?[0-9]+(\.[0-9]+)?')]);
          this.formInscription.get('user.nomEnt').updateValueAndValidity();
          this.formInscription.get('user.latitudeEnt').updateValueAndValidity();
          this.formInscription.get('user.longitudeEnt').updateValueAndValidity();
        }
        if (entreprise === '0') {
          this.formInscription.get('user.nomEnt').setValidators(null);
          this.formInscription.get('user.latitudeEnt').setValidators(null);
          this.formInscription.get('user.longitudeEnt').setValidators(null);
          this.formInscription.get('user.nomEnt').updateValueAndValidity();
          this.formInscription.get('user.latitudeEnt').updateValueAndValidity();
          this.formInscription.get('user.longitudeEnt').updateValueAndValidity();
        }
      }
    );
  }

  addUser(FormData) {
    if (FormData.user.passwordUser.toString() === FormData.user.passwordVerify.toString()) {
      console.log('true');
      this.samePassword = true;
    } else {
      console.log('false');
      this.samePassword = false;
      this.formInscription.get('user.passwordUser').reset();
      this.formInscription.get('user.passwordVerify').reset();
    }
    if (this.samePassword) {
      FormData.user.passwordUser = Md5.hashStr(FormData.user.passwordUser);
      FormData.user.passwordVerify = Md5.hashStr(FormData.user.passwordVerify);
      this._usersService.addUser(FormData).subscribe(
        data => {
          console.log('subscribe data', data);
          console.log('subscribe data', data.result.status);
          if (data.result.status === 'success') {
            this.formInscription.reset();
            this.inscriptionIsOk = true;
          }
          if (data.result.status === 'errors') {
            // this.formInscription.setErrors
            for (let i = 0; i < data.result.arrayError.length; i++) {
              console.log(data.result.arrayError[i]);
              this.formInscription.get('user.' + data.result.arrayError[i]).setErrors({ 'incorrect': true });
            }
          }
        }
      );
      this.formInscription.get('user.passwordUser').reset();
      this.formInscription.get('user.passwordVerify').reset();
    }
  }


}
