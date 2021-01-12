import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'import-component',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {

  public importData: string;

  constructor(
    public firestoreService: FirestoreService
  ) {

  }  

  public import()
  {
    this.firestoreService.importDashboard(this.importData);
  }
}
