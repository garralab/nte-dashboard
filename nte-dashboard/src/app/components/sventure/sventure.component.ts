import { Component, Input } from '@angular/core';
import { CharacterSheet } from 'src/app/models/app.model';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'sventure-component',
  templateUrl: './sventure.component.html',
  styleUrls: ['./sventure.component.css']
})
export class SventureComponent {

  @Input('data') characterSheet: CharacterSheet;
  @Input('disabled') isEditDisabled: boolean;

  constructor(
    public firestoreService: FirestoreService
  ) {

  }

  /**
   * triggered when we edit text in an exagon
   */
  public onBlur() {
    if (this.isEditDisabled)
      return;

    this.firestoreService.updatePG();
  }

  /**
   * change Adrenaline/dazed state
   * @param stateChanged adrenaline or dazed
   */
  public triggerState(stateChanged: string) {
    if (this.isEditDisabled)
      return;

    if (stateChanged == 'dazed') {
      this.characterSheet.dazed = !this.characterSheet.dazed;
    } else if (stateChanged == 'adrenaline') {
      this.characterSheet.adrenaline = !this.characterSheet.adrenaline;
    }
    this.firestoreService.updatePG();
  }

}
