import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireAuth } from "@angular/fire/auth"
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Functions } from '../utilities.functions';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  public myID: string = "";
  public myEmail: string = "";

  constructor(
    private afAuth: AngularFireAuth,
    public routerService: Router,
    public location: Location,
    private toastr: ToastrService
  ) {
    let self = this;
    this.afAuth.auth.languageCode = "it";
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.NONE).then(function () {
      //changing session state
    });

    this.afAuth.auth.onAuthStateChanged((userAuth: any) => {
      // safety check
      if (Functions.IsNullOrUndefined(userAuth) == true)
        return;

      self.myID = userAuth.uid;
      self.myEmail = userAuth.email;

      if (Functions.IsNullOrUndefined(userAuth.uid) == false) {
        self.routerService.navigate(['/home-interna'], { skipLocationChange: true, queryParams: {} });
        self.location.replaceState("");
      }
    }, (err) => {
      // Error
      self.toastr.error("Errore, riavviare l'applicazione per favore", 'Errore', {
        timeOut: 10000,
        extendedTimeOut: 4000,
        positionClass: "toast-top-center"
      });
    });
  }


  public login(mail: string, password: string) {
    let self = this;
    this.afAuth.auth.signInWithEmailAndPassword(mail, password)
      .then((data: firebase.auth.UserCredential) => {
        //TODO:
      })
      .catch((error: any) => {
        // Error
        self.toastr.error('Errore, riprova per favore', 'Errore', {
          timeOut: 10000,
          extendedTimeOut: 4000,
          positionClass: "toast-top-center"
        });
      });
  }

  public signUp(mail: string, password: string) {
    const self: this = this;
    this.afAuth.auth.createUserWithEmailAndPassword(mail, password)
      .then((infoes) => {

      })
      .catch((error: any) => {
        if (error.code == "auth/email-already-in-use") {
          self.toastr.error('Email già in uso', 'Errore', {
            timeOut: 10000,
            extendedTimeOut: 4000,
            positionClass: "toast-top-center"
          });
        } else {
          self.toastr.error('Errore, riprova per favore', 'Errore', {
            timeOut: 10000,
            extendedTimeOut: 4000,
            positionClass: "toast-top-center"
          });
        }
      });
  }

}
