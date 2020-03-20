import { Component } from '@angular/core';
import { Functions } from 'src/app/utilities.functions';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'home-interna-component',
  templateUrl: './home-interna.component.html',
  styleUrls: ['./home-interna.component.css']
})
export class HomeInternaComponent {

  // public dashboardList: any[] = [
  //   { value: 'steak-0', viewValue: 'Steak' },
  //   { value: 'pizza-1', viewValue: 'Pizza' },
  //   { value: 'tacos-2', viewValue: 'Tacos' }
  // ];
  public selectedDashboard: any;

  public dashTitle: string = "";
  public isMasterMail: boolean = false;
  public masterMail: string = "";
  public inv1: string = "";
  public inv2: string = "";
  public inv3: string = "";
  public inv4: string = "";
  public inv5: string = "";
  public inv6: string = "";

  public showCreateDashboard: boolean = false;

  constructor(
    public firestoreService: FirestoreService,
    private authenticationService: AuthenticationService
  ) {
    this.firestoreService.getAvailableDashboards();
  }

  /**
   * toggle create dashboard
   */
  public createDashboard() {
    this.showCreateDashboard = !this.showCreateDashboard;
  }

  /**
   * create a new dashboard and jump in it
   */
  public newDashboard() {
    if (Functions.IsNullOrUndefined(this.dashTitle) == true || Functions.IsNullOrUndefined(this.dashTitle) == true)
      return;

    if ((Functions.IsNullOrUndefined(this.masterMail) == true || Functions.validateEmail(this.masterMail) == false) && this.isMasterMail == false)
      return;

    // create dashboard
    const userMails: string[] = [];
    // userMails.push(this.authenticationService.myEmail);

    if (Functions.IsNullOrUndefined(this.inv1) == false && Functions.IsStringEmpty(this.inv1) == false && Functions.validateEmail(this.inv1) == true) {
      userMails.push(this.inv1);
    }

    if (Functions.IsNullOrUndefined(this.inv2) == false && Functions.IsStringEmpty(this.inv2) == false && Functions.validateEmail(this.inv2) == true) {
      userMails.push(this.inv2);
    }

    if (Functions.IsNullOrUndefined(this.inv3) == false && Functions.IsStringEmpty(this.inv3) == false && Functions.validateEmail(this.inv3) == true) {
      userMails.push(this.inv3);
    }

    if (Functions.IsNullOrUndefined(this.inv4) == false && Functions.IsStringEmpty(this.inv4) == false && Functions.validateEmail(this.inv4) == true) {
      userMails.push(this.inv4);
    }

    if (Functions.IsNullOrUndefined(this.inv5) == false && Functions.IsStringEmpty(this.inv5) == false && Functions.validateEmail(this.inv5) == true) {
      userMails.push(this.inv5);
    }

    if (Functions.IsNullOrUndefined(this.inv6) == false && Functions.IsStringEmpty(this.inv6) == false && Functions.validateEmail(this.inv6) == true) {
      userMails.push(this.inv6);
    }

    let masterEmail: string = "";
    if(this.isMasterMail) {
      masterEmail = this.authenticationService.myEmail;
    } else {
      masterEmail = this.masterMail;
    }

    this.firestoreService.createDashboard(this.dashTitle, userMails, masterEmail);
  }

  /**
   * jump in the selected dashboard
   */
  public enterDashboard() {
    if (Functions.IsNullOrUndefined(this.selectedDashboard) == true)
      return;

    //ask for data
    this.firestoreService.enterDashboard(this.selectedDashboard);
  }

}
