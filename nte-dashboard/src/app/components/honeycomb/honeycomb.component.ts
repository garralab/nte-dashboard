import { Component, Input } from '@angular/core';
import { CharacterSheet } from 'src/app/models/app.model';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'honeycomb-component',
  templateUrl: './honeycomb.component.html',
  styleUrls: ['./honeycomb.component.css']
})
export class HoneycombComponent {

  @Input('data') characterSheet: CharacterSheet;
  @Input('disabled') isEditDisabled: boolean;

  constructor(
    public firestoreService: FirestoreService
  ) {

  }

  /**
   * triggered clicking on the dots of a trat
   */
  public triggerTrat(tratsCoordinates: string) {
    if (this.isEditDisabled)
      return;

    this.characterSheet.trats[tratsCoordinates].tokenized = !this.characterSheet.trats[tratsCoordinates].tokenized;
    this.firestoreService.updatePG();
  }

  /**
   * triggered when we edit text in an exagon
   */
  public onBlur() {
    if (this.isEditDisabled)
      return;

    this.firestoreService.updatePG();
  }
}
