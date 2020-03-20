import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { DashboardData, CharacterSheet, Lesson, Extraction, Sacchetto } from '../models/app.model';
import { Functions } from '../utilities.functions';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class FirestoreService {
  private moduleName: string = "firestoreService";

  private dashboardDatasList: AngularFirestoreCollection<DashboardData>;
  public dashboardDatasListObservable: Observable<DashboardData[]>;

  private dashboardDataDoc: AngularFirestoreDocument<DashboardData>;
  private dashboardDataDocObservable: Observable<DashboardData>;
  private dashboardDataDocSubscription: Subscription;

  public dashboardData: DashboardData;
  public selectedCharacter: CharacterSheet;
  // public dashboardDataDocBehavior: BehaviorSubject<DashboardData> = new BehaviorSubject<DashboardData>(undefined);

  constructor(
    private authenticationService: AuthenticationService,
    private afs: AngularFirestore,
    public routerService: Router,
    public location: Location,
    private toastr: ToastrService
  ) { }

  /**
   * retrive the dashboard available for me
   */
  public getAvailableDashboards() {
    this.dashboardDatasList = this.afs.collection<DashboardData>('dashboard/', ref => ref.where("invitedPlayerMail", "array-contains", this.authenticationService.myEmail).orderBy("dashboardTitle", "desc"));
    this.dashboardDatasListObservable = this.dashboardDatasList.valueChanges();
  }

  /**
   * create dashboard
   * @param dashTitle dashboard title
   * @param userMails users emails
   */
  public createDashboard(dashTitle: string, userMails: string[], masterEmail: string) {
    const self: this = this;
    const newDashboard: DashboardData = this.initializeNewDashboard(dashTitle, userMails, masterEmail);
    const newDashboardNormalized: DashboardData = JSON.parse(JSON.stringify(newDashboard));

    this.dashboardDataDoc = this.afs.doc<DashboardData>('dashboard/' + newDashboard.dashboardID);
    this.dashboardDataDoc.set(newDashboardNormalized)
      .then((value: any) => {
        self.enterDashboard(newDashboard.dashboardID);
      });
  }

  /**
   * enter in a specific dashboard
   * @param uid dashboard ID
   */
  public enterDashboard(uid: string) {
    let self = this;
    if (Functions.IsNullOrUndefined(this.dashboardDataDocSubscription) == false)
      this.dashboardDataDocSubscription.unsubscribe();

    this.dashboardDataDoc = this.afs.doc<DashboardData>('dashboard/' + uid);
    this.dashboardDataDocObservable = this.dashboardDataDoc.valueChanges();
    this.dashboardDataDocSubscription = this.dashboardDataDocObservable.subscribe((dashboardData: DashboardData) => {
      self.dashboardData = dashboardData;

      self.routerService.navigate(['dashboard'], { skipLocationChange: true, queryParams: {} });
      self.location.replaceState("");
    });
  }

  /**
   * helper to create and initialize a new dashboard
   * @param dashTitle dashboard title
   * @param userMails users emails
   */
  private initializeNewDashboard(dashTitle: string, userMails: string[], masterEmail: string): DashboardData {
    const uid: string = Functions.CreateGuid();
    const normalizedUserEmailsSet: Set<string> = new Set(userMails);
    normalizedUserEmailsSet.add(masterEmail);
    const normalizedEmails: string[] = Array.from(normalizedUserEmailsSet.values());
    const newDashboard: DashboardData = new DashboardData(uid, dashTitle, normalizedEmails, masterEmail);

    for (let index: number = 0; index < userMails.length; index++) {
      const newSheet: CharacterSheet = new CharacterSheet(userMails[index]);
      newDashboard.sheets.push(newSheet);
    }

    return newDashboard;
  }

  /**
   * add an NPC to the dashboard
   */
  public addNPC() {
    const self: this = this;
    const newCharacter: CharacterSheet = new CharacterSheet("");
    newCharacter.playerName = "PNG";
    newCharacter.characterName = "PNG";

    this.dashboardData.sheets.push(newCharacter);

    const dashboardNormalized: any = JSON.parse(JSON.stringify(this.dashboardData));
    this.dashboardDataDoc.update(dashboardNormalized)
      .catch((error: any) => {
        // Error
        self.toastr.error("Errore, riavviare l'applicazione per favore", 'Errore', {
          timeOut: 10000,
          extendedTimeOut: 4000,
          positionClass: "toast-top-center"
        });
      });
  }

  /**
   * Remove a player from the dashboard
   * @param aCharacter called when a user remove another player from dashboard
   */
  public removeCharacterAndPlayer(aCharacter: CharacterSheet) {
    if (Functions.IsStringEmpty(aCharacter.playerEmail) == true) {
      // NPC
      this.dashboardData.sheets = this.dashboardData.sheets.filter((aSheet: CharacterSheet) => aSheet.uid == aCharacter.uid);
    } else {
      //PC
      this.dashboardData.invitedPlayerMail = this.dashboardData.invitedPlayerMail.filter((aMail: string) => aMail == aCharacter.playerEmail);
      this.dashboardData.sheets = this.dashboardData.sheets.filter((aSheet: CharacterSheet) => aSheet.uid == aCharacter.uid);
    }

    const self: this = this;
    const dashboardNormalized: any = JSON.parse(JSON.stringify(this.dashboardData));
    this.dashboardDataDoc.update(dashboardNormalized)
      .catch((error: any) => {
        // Error
        self.toastr.error("Errore, riavviare l'applicazione per favore", 'Errore', {
          timeOut: 10000,
          extendedTimeOut: 4000,
          positionClass: "toast-top-center"
        });
      });
  }

  /**
   * Add a player to the dashboard
   * @param email of the new player
   */
  public addUserToDashboard(email: string) {
    const newPlayerSheet: CharacterSheet = new CharacterSheet(email);
    this.dashboardData.invitedPlayerMail.push(email);
    this.dashboardData.sheets.push(newPlayerSheet);

    const self: this = this;
    const dashboardNormalized: any = JSON.parse(JSON.stringify(this.dashboardData));
    this.dashboardDataDoc.update(dashboardNormalized)
      .catch((error: any) => {
        // Error
        self.toastr.error("Errore, riavviare l'applicazione per favore", 'Errore', {
          timeOut: 10000,
          extendedTimeOut: 4000,
          positionClass: "toast-top-center"
        });
      });
  }

  /**
   * Update trats of current selection
   */
  public updatePG() {
    const indexOfPg: number = this.dashboardData.sheets.findIndex((aSheet: CharacterSheet) => aSheet.uid == this.selectedCharacter.uid);
    if (indexOfPg < 0)
      return;

    this.dashboardData.sheets[indexOfPg] = Object.assign({}, this.selectedCharacter);

    const self: this = this;
    const dashboardNormalized: any = JSON.parse(JSON.stringify(this.dashboardData));
    this.dashboardDataDoc.update(dashboardNormalized)
      .catch((error: any) => {
        // Error
        self.toastr.error("Errore, riavviare l'applicazione per favore", 'Errore', {
          timeOut: 10000,
          extendedTimeOut: 4000,
          positionClass: "toast-top-center"
        });
      });
  }

  public extract(sacchetto: Sacchetto) {
    let owner: string = "";

    //check if DM is extracting
    if (this.authenticationService.myEmail == this.dashboardData.masterMail) {
      owner = "Narratore";
    } else {
      let myPg: CharacterSheet = this.dashboardData.sheets.find((aSheet: CharacterSheet) => aSheet.playerEmail == this.authenticationService.myEmail);
      owner = myPg.characterName;
    }

    const newExtractionEntry: Extraction = new Extraction(owner, sacchetto.extracted);
    if (sacchetto.riskExtracted.length > 0) {
      newExtractionEntry.isRisk = true;
      newExtractionEntry.extractionRiskResult = sacchetto.riskExtracted;
    }

    if (Functions.IsNullOrUndefined(this.dashboardData.extractions) == true) {
      this.dashboardData.extractions = [];
    }

    this.dashboardData.extractions.push(newExtractionEntry);

    const self: this = this;
    const dashboardNormalized: any = JSON.parse(JSON.stringify(this.dashboardData));
    this.dashboardDataDoc.update(dashboardNormalized)
      .catch((error: any) => {
        // Error
        self.toastr.error("Errore, riavviare l'applicazione per favore", 'Errore', {
          timeOut: 10000,
          extendedTimeOut: 4000,
          positionClass: "toast-top-center"
        });
      });
  }

}
