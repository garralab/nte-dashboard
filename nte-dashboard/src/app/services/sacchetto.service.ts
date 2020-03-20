import { Injectable } from '@angular/core';
import { Functions } from '../utilities.functions';
import { Sacchetto, Token } from '../models/app.model';
import { FirestoreService } from './firestore.service';


@Injectable()
export class SacchettoService {
  private moduleName: string = "sacchettoService";

  public sacchetto: Sacchetto = new Sacchetto();

  constructor(private firestoreService: FirestoreService) { }

  public estrai() {

    //#region - preparing the sack
    this.sacchetto.extractionSack = [];
    this.sacchetto.extracted = [];
    for (let index: number = 0; index < this.sacchetto.positive; index++) {
      this.sacchetto.extractionSack.push(Token.Positive);
    }

    for (let index: number = 0; index < this.sacchetto.negative; index++) {
      this.sacchetto.extractionSack.push(Token.Negative);
    }

    for (let index: number = 0; index < this.sacchetto.random; index++) {
      const random_boolean: boolean = Math.random() >= 0.5;
      if(random_boolean) {
        this.sacchetto.extractionSack.push(Token.Positive);
      } else {
        this.sacchetto.extractionSack.push(Token.Negative);
      }
    }

    this.shuffle();
    //#endregion - preparing the sack

    for (let index: number = 0; index < this.sacchetto.extract; index++) {
      this.sacchetto.extracted.push(this.sacchetto.extractionSack.pop());
    }

    this.firestoreService.extract(this.sacchetto);

  }

  public rischia() {
    let extractMax: number = 5;
    if(this.sacchetto.positive + this.sacchetto.negative + this.sacchetto.random < 5) {
      extractMax = this.sacchetto.positive + this.sacchetto.negative + this.sacchetto.random;
    }

    const toExtract: number = extractMax - this.sacchetto.extracted.length;
    for (let index: number = 0; index < toExtract; index++) {
      this.sacchetto.riskExtracted.push(this.sacchetto.extractionSack.pop());
    }

    this.firestoreService.extract(this.sacchetto);
  }

  private shuffle() {
    let currentIndex: number = this.sacchetto.extractionSack.length;
    let temporaryValue: any;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.sacchetto.extractionSack[currentIndex];
      this.sacchetto.extractionSack[currentIndex] = this.sacchetto.extractionSack[randomIndex];
      this.sacchetto.extractionSack[randomIndex] = temporaryValue;
    }
  }

}
