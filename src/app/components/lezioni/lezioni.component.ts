import { Component, Input } from '@angular/core';
import { CharacterSheet, Lesson } from 'src/app/models/app.model';
import { MatDialog } from '@angular/material/dialog';
import { EditLessonDialogComponent } from '../edit-lesson-dialog/edit-lesson-dialog.component';
import { Functions } from 'src/app/utilities.functions';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'lezioni-component',
  templateUrl: './lezioni.component.html',
  styleUrls: ['./lezioni.component.css']
})
export class LezioniComponent {

  public isLessonOneHover: boolean = false;
  public isLessonTwoHover: boolean = false;
  public isLessonThreeHover: boolean = false;

  @Input('data') characterSheet: CharacterSheet;
  @Input('disabled') isEditDisabled: boolean;

  constructor(
    public firestoreService: FirestoreService,
    public dialog: MatDialog
  ) {

  }

  /**
   * trigger when the user try to edit a lesson
   * @param lessonNumber lesson number
   */
  public editLesson(lessonNumber: number) {
    if (this.isEditDisabled)
      return;

    const self: this = this;
    let selectedLesson: Lesson;
    switch (lessonNumber) {
      case 0:
        selectedLesson = this.characterSheet.lessons[0];
        break;

      case 1:
        selectedLesson = this.characterSheet.lessons[1];
        break;

      case 2:
        selectedLesson = this.characterSheet.lessons[2];
        break;
    }

    if (Functions.IsNullOrUndefined(selectedLesson) == true)
      selectedLesson = new Lesson();

    const dialogRef = this.dialog.open(EditLessonDialogComponent, {
      width: '400px',
      data: selectedLesson
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "OK") {
        const updatedLesson: Lesson = dialogRef.componentInstance.data;
        self.characterSheet.lessons[lessonNumber] = updatedLesson;
        self.firestoreService.updatePG();
        // self.firestoreService.editLesson(lessonNumber, updatedLesson);
      }
    });
  }

  /**
   * tcalled when a lesson is trggered
   * @param lessonTriggered
   */
  public triggerLesson(event: any, lessonTriggered: number) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isEditDisabled)
      return;

    this.characterSheet.lessons[lessonTriggered].activated = !this.characterSheet.lessons[lessonTriggered].activated;
    this.firestoreService.updatePG();
  }

}
