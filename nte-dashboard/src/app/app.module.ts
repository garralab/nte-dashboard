import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

// Create Material Module with all we need
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDialogModule
} from "@angular/material";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HoneycombComponent } from './components/honeycomb/honeycomb.component';
import { SventureComponent } from './components/sventure/sventure.component';
import { RisorseComponent } from './components/risorse/risorse.component';
import { LezioniComponent } from './components/lezioni/lezioni.component';
import { AuthenticationService } from './services/authentication.service';
import { FirestoreService } from './services/firestore.service';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomeInternaComponent } from './components/home-interna/home-interna.component';
import { InviteUserDialogComponent } from './components/invite-user-dialog/invite-user-dialog.component';
import { EditLessonDialogComponent } from './components/edit-lesson-dialog/edit-lesson-dialog.component';
import { SacchettoComponent } from './components/sacchetto/sacchetto.component';
import { SacchettoService } from './services/sacchetto.service';
import { ExtractionListComponent } from './components/extraction-list/extraction-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeInternaComponent,
    DashboardComponent,
    HoneycombComponent,
    SventureComponent,
    RisorseComponent,
    LezioniComponent,
    InviteUserDialogComponent,
    EditLessonDialogComponent,
    SacchettoComponent,
    ExtractionListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true
    }),
  ],
  providers: [
    AuthenticationService,
    FirestoreService,
    SacchettoService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InviteUserDialogComponent,
    EditLessonDialogComponent
  ]
})
export class AppModule { }
