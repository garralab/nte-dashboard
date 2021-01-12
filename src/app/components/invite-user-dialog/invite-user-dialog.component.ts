import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InviteDialogData } from 'src/app/models/app.model';
import { Functions } from 'src/app/utilities.functions';

@Component({
  selector: 'invite-user-dialog',
  templateUrl: './invite-user-dialog.component.html',
  styleUrls: ['./invite-user-dialog.component.css']
})
export class InviteUserDialogComponent {

  public isNotValid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<InviteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InviteDialogData) { }

  onNoClick(): void {
    this.data.email = "";
    this.dialogRef.close("NO");
  }

  onOkClick(): void {
    if (Functions.IsStringEmpty(this.data.email) == true || Functions.validateEmail(this.data.email) == false) {
      this.isNotValid = true;
      return;
    }

    this.dialogRef.close("OK");
  }

}
