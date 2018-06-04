import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../class/user';
import { UsersService } from '../users.service';
import { Md5 } from 'ts-md5/dist/md5';
import { FileSelectDirective, FileUploader, FileItem } from 'ng2-file-upload';
import { forEach } from '@angular/router/src/utils/collection';



@Component({
  moduleId: module.id,
  selector: 'vawec-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  formInscription: FormGroup;
  user: User;
  samePassword = true;
  errQuery = false;
  errMail = false;
  inscriptionIsOk: boolean;

  fileCv = null;
  fileCvError = true;

  photoUser = null;
  profilError = true;

  imageUser = null;
  bgError = true;

  dateConnection: number;

  /* function here */
  uriCv = 'http://localhost:4201/api/v1/upload/cv';
  uriPhoto = 'http://localhost:4201/api/v1/upload/photo';
  uriImg = 'http://localhost:4201/api/v1/upload/img';

  attachementList: any = [];
  uploaderCv: FileUploader;
  uploaderPhoto: FileUploader;
  uploaderImg: FileUploader;

  constructor(private formBuilder: FormBuilder, private _usersService: UsersService) {

  }

  ngOnInit() {

    this.dateConnection = Date.now();
    this.uploaderCv = new FileUploader({
      url: this.uriCv,
      // additionalParameter: {
      //   'dateConnection': this.dateConnection
      // }
    });

    this.uploaderPhoto = new FileUploader({
      url: this.uriPhoto,
      // additionalParameter: {
      //   'dateConnection': this.dateConnection
      // }
    });
    this.uploaderImg = new FileUploader({
      url: this.uriImg,
      // additionalParameter: {
      //   'dateConnection': this.dateConnection
      // }
    });

    this.formInscription = this.formBuilder.group({
      user: this.formBuilder.group({
        nomUser: ['', Validators.required],
        prenomUser: ['', Validators.required],
        mailUser: ['', [Validators.email, Validators.required]],
        passwordUser: ['', [Validators.required]],
        passwordVerify: ['', [Validators.required]],
        dateInscription: new Date(),
        cvUser: ['', null],
        rueUser: ['', Validators.required],
        codePostalUser: ['', Validators.required],
        villeUser: ['', Validators.required],
        nomEnt: ['', null],
        latitudeEnt: ['', null],
        longitudeEnt: ['', null],
        photoUser: ['', null],
        imageUser: ['', null],
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

  getProgress(progress) {
    if (!Number.isInteger(progress)) {
      progress = 0;
    }
    return progress;
  }

  onFileChange($event) {
   
    if ($event.target.files.length !== 0) {

      if ($event.target.id == "photoUser") {
        if (this.uploaderPhoto.queue.length >= 2) {
          this.uploaderPhoto.queue.shift();
        }
        this.photoUser = 'http://localhost:4201/api/v1/public/uploads/photo/' + this.dateConnection + '.' + $event.target.files["0"].name;
        this.profilError = false;
        this.uploaderPhoto.queue[0].file.name = this.dateConnection + '.' + $event.target.files["0"].name;
        
      }
      if ($event.target.id == "imageUser") {
        if (this.uploaderImg.queue.length >= 2) {
          this.uploaderImg.queue.shift();
        }
        this.imageUser = 'http://localhost:4201/api/v1/public/uploads/img/' + this.dateConnection + '.' + $event.target.files["0"].name;
        this.bgError = false;
        this.uploaderImg.queue[0].file.name = this.dateConnection + '.' + $event.target.files["0"].name;
      }
      if ($event.target.id == "cvUser") {
        if (this.uploaderCv.queue.length >= 2) {
          this.uploaderCv.queue.shift();
        }
        this.fileCv = 'http://localhost:4201/api/v1/public/uploads/cv/' + this.dateConnection + '.' + $event.target.files["0"].name;
        this.fileCvError = false;
        this.uploaderCv.queue[0].file.name = this.dateConnection + '.' + $event.target.files["0"].name;
      }

    } else {
      if ($event.target.id == "cvUser") {
        this.fileCv = null;
        this.fileCvError = true;
      }
      if ($event.target.id == "photoUser") {
        this.fileCv = null;
        this.profilError = true;
      }
      if ($event.target.id == "imageUser") {
        this.fileCv = null;
        this.bgError = true;
      }
    }
  }

  addUser(FormData) {
    this.errMail = false;
    if (FormData.user.passwordUser.toString() === FormData.user.passwordVerify.toString()) {
      this.samePassword = true;
    } else {
      this.samePassword = false;
      this.formInscription.get('user.passwordUser').reset();
      this.formInscription.get('user.passwordVerify').reset();
    }
    if (this.samePassword) {
      if (!this.fileCvError && !this.profilError && !this.bgError) {

        FormData.user.photoUser = this.photoUser;
        FormData.user.imageUser = this.imageUser;
        FormData.user.cvUser = this.fileCv;
        this.uploaderPhoto.uploadAll();
        this.uploaderPhoto.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          this.attachementList.push(JSON.parse(response));
          this.uploaderImg.uploadAll();

          this.uploaderImg.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.attachementList.push(JSON.parse(response));
            this.uploaderCv.uploadAll();

            this.uploaderCv.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
              this.attachementList.push(JSON.parse(response));
              this.attachementList.forEach(element => {
                if (element.typeError == "cv") {
                  (<HTMLInputElement>document.getElementById("cvUser")).value = "";
                  this.uploaderCv.clearQueue();
                  this.fileCvError = true;
                }
                if (element.typeError == "photo") {
                  (<HTMLInputElement>document.getElementById("photoUser")).value = "";
                  this.uploaderPhoto.clearQueue();
                  this.profilError = true;

                  (<HTMLInputElement>document.getElementById("cvUser")).value = "";
                  this.uploaderCv.clearQueue();
                  this.fileCvError = true;
                }

                if (element.typeError == "img") {
                  (<HTMLInputElement>document.getElementById("imageUser")).value = "";
                  this.uploaderImg.clearQueue();
                  this.bgError = true;

                  (<HTMLInputElement>document.getElementById("cvUser")).value = "";
                  this.uploaderCv.clearQueue();
                  this.fileCvError = true;
                }

              });

              if (!this.fileCvError && !this.profilError && !this.bgError) {
                FormData.user.passwordUser = Md5.hashStr(FormData.user.passwordUser);
                FormData.user.passwordVerify = Md5.hashStr(FormData.user.passwordVerify);
                this._usersService.addUser(FormData).subscribe(
                  data => {
                    if (data.result.status === 'success') {
                      this.formInscription.reset();
                      this.uploaderPhoto.clearQueue();
                      this.uploaderImg.clearQueue();
                      this.uploaderCv.clearQueue();
                      this.inscriptionIsOk = true;
                    }
                    if (data.result.status === 'errors') {
                      if (data.result.arrayError["0"] == "ER_DUP_ENTRY") {
                        this.errMail = true;
                      } else if (data.result.arrayError["0"] == "queryFailed") {
                        this.errQuery = true;
                      } else {
                        for (let i = 0; i < data.result.arrayError.length; i++) {
                          this.formInscription.get('user.' + data.result.arrayError[i]).setErrors({ 'incorrect': true });
                        }
                      }
                    }
                  }
                );
                this.formInscription.get('user.passwordUser').reset();
                this.formInscription.get('user.passwordVerify').reset();
              }
            } // end this.uploaderCv
          } // end this.uploaderImg
        } // end this.uploaderPhoto
      }
    }
  }
}
