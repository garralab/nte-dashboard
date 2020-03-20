import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SacchettoService } from 'src/app/services/sacchetto.service';
import { Sacchetto } from 'src/app/models/app.model';

@Component({
  selector: 'sacchetto-component',
  templateUrl: './sacchetto.component.html',
  styleUrls: ['./sacchetto.component.css']
})
export class SacchettoComponent {

  constructor(
    public firestoreService: FirestoreService,
    public sacchettoService: SacchettoService
  ) {

  }

  public addSacchetto(tokenCode: string) {
    switch (tokenCode) {
      case "P":
        this.sacchettoService.sacchetto.positive = this.sacchettoService.sacchetto.positive + 1;
        break;

      case "N":
        this.sacchettoService.sacchetto.negative = this.sacchettoService.sacchetto.negative + 1;
        break;

      case "R":
        this.sacchettoService.sacchetto.random = this.sacchettoService.sacchetto.random + 1;
        break;

      default:
        break;
    }
  }

  public removeSacchetto(tokenCode: string) {
    switch (tokenCode) {
      case "P":
        if (this.sacchettoService.sacchetto.positive == 0)
          break;

        this.sacchettoService.sacchetto.positive = this.sacchettoService.sacchetto.positive - 1;
        break;

      case "N":
        if (this.sacchettoService.sacchetto.negative == 0)
          break;

        this.sacchettoService.sacchetto.negative = this.sacchettoService.sacchetto.negative - 1;
        break;

      case "R":
        if (this.sacchettoService.sacchetto.random == 0)
          break;

        this.sacchettoService.sacchetto.random = this.sacchettoService.sacchetto.random - 1;
        break;

      default:
        break;
    }
  }

  public plusEstrai() {
    this.sacchettoService.sacchetto.extract = this.sacchettoService.sacchetto.extract + 1;
  }

  public lessEstrai() {
    if (this.sacchettoService.sacchetto.extract <= 1)
      return;

    this.sacchettoService.sacchetto.extract = this.sacchettoService.sacchetto.extract - 1;
  }

  public estrai() {
    this.sacchettoService.estrai();
  }

  public rischia() {
    this.sacchettoService.rischia();
  }

  public newExtraction() {
    this.sacchettoService.sacchetto = new Sacchetto();
  }

}
