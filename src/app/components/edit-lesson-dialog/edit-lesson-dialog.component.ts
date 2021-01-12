import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lesson } from 'src/app/models/app.model';
import { Functions } from 'src/app/utilities.functions';

@Component({
  selector: 'edit-lesson-dialog',
  templateUrl: './edit-lesson-dialog.component.html',
  styleUrls: ['./edit-lesson-dialog.component.css']
})
export class EditLessonDialogComponent {

  public isNotValid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lesson) { }

  onNoClick(): void {
    this.dialogRef.close("NO");
  }

  onOkClick(): void {
    this.dialogRef.close("OK");
  }

}
