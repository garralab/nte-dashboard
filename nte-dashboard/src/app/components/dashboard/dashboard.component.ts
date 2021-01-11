import { Component } from '@angular/core';
import { DashboardData, CharacterSheet } from 'src/app/models/app.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Functions } from 'src/app/utilities.functions';
import { MatDialog } from '@angular/material/dialog';
import { InviteUserDialogComponent } from '../invite-user-dialog/invite-user-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // public selectedCharacter: CharacterSheet;

  public showDeleteCharacter: boolean = false;
  public showPlayerHelp: boolean = false;
  public showMasterHelp: boolean = false;
  public showExtractionPanel: boolean = false;

  constructor(
    public firestoreService: FirestoreService,
    public authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) {

  }

  /**
   * add NPC
   */
  public addNPC() {
    this.firestoreService.addNPC();
  }

  /**
   * activated when player press bin icon in the dashboard sidebar
   */
  public toggleDeleteCharacter() {
    this.showDeleteCharacter = !this.showDeleteCharacter;
  }

  /**
   * activated when player press player help icon in the dashboard sidebar
   */
  public togglePlayerHelp() {
    this.showMasterHelp = false;
    this.showExtractionPanel = false;
    this.showPlayerHelp = !this.showPlayerHelp;
  }

  /**
   * activated when player press master help icon in the dashboard sidebar
   */
  public toggleMasterHelp() {
    this.showPlayerHelp = false;
    this.showExtractionPanel = false;
    this.showMasterHelp = !this.showMasterHelp;
  }

  /**
   * activated when player press the extraction button in th sidebar
   */
  public toggleEstrazione() {
    this.showPlayerHelp = false;
    this.showMasterHelp = false;
    this.showExtractionPanel = !this.showExtractionPanel;
  }

  /**
   * add a new player to the dashboard
   */
  public invite() {
    const self: this = this;
    const dialogRef = this.dialog.open(InviteUserDialogComponent, {
      width: '300px',
      data: { email: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "OK") {
        const email: string = dialogRef.componentInstance.data.email;
        self.firestoreService.addUserToDashboard(email);
      }
    });
  }

  /**
   * remove character and player
   * @param aCharacter
   */
  public deleteCharacter(event: any, aCharacter: CharacterSheet) {
    event.preventDefault();
    event.stopPropagation();

    if (Functions.IsNullOrUndefined(aCharacter) == true)
      return;

    if (window.confirm('Se procedi cancellerai il personaggio ed eliminerai il giocatore ad esseo associato dalla dashboard (non potrà più accedervi), vuoi continuare?')) {
      this.firestoreService.removeCharacterAndPlayer(aCharacter);
    }
  }

  /**
   * triggered when a character is selected from the left side
   * @param aCharacter the selected character sheet
   */
  public characterSelected(aCharacter: CharacterSheet) {
    this.showMasterHelp = false;
    this.showPlayerHelp = false;
    this.firestoreService.selectedCharacter = Object.assign({}, aCharacter);
  }

  /**
   * triggered when we edit text in an exagon
   */
  public onBlur() {
    this.firestoreService.updatePG();
  }

  /**
   * triggered when the master click the delete button in the sidebar
   */
  public deleteDashboard() {
    if (window.confirm("Se procedi cancellerai l'intera dashboard (il processo è irreversibile), vuoi continuare?")) {
      this.firestoreService.deleteDashboard();
    }
  }
}
