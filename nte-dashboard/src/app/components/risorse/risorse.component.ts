import { Component, Input } from '@angular/core';
import { CharacterSheet } from 'src/app/models/app.model';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'risorse-component',
  templateUrl: './risorse.component.html',
  styleUrls: ['./risorse.component.css']
})
export class RisorseComponent {

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

}
