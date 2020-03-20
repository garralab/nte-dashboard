import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'extraction-list-component',
  templateUrl: './extraction-list.component.html',
  styleUrls: ['./extraction-list.component.css']
})
export class ExtractionListComponent {

  constructor(
    public firestoreService: FirestoreService
  ) {

  }

}
