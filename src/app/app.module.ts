import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  MatSelectModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatTableModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatAutocompleteModule,
  MatSortModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConsultantProfileComponent } from './consultant-profile/consultant-profile.component';
import { ConsultantSearchComponent } from './consultant-search/consultant-search.component';
import { CompetenceFormComponent } from './competence-form/competence-form.component';
import { MatAutocompleteComponent } from './reusable-components/mat-autocomplete.component';
import { ListShowComponent } from './reusable-components/list-show/list-show.component';
import { ConsultantFormComponent } from './consultant-form/consultant-form.component';
import { MatDragAndDropComponent } from './reusable-components/mat-drag-and-drop/mat-drag-and-drop.component';
import { MatDatepickerComponent } from './reusable-components/mat-datepicker.component';
import { ReactiveFormArrayComponent } from './reusable-components/reactive-form-array/reactive-form-array.component';
import { MatSelectComponent } from './reusable-components/mat-select.component';
import { ConfirmationDialogComponent } from './reusable-components/confirmation-dialog.component';
import { ControlMessagesComponent } from './reusable-components/control-messages.component';
import { ConsultantCompetencesComponent } from './consultant-competences/consultant-competences.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsultantProfileComponent,
    ConsultantSearchComponent,
    CompetenceFormComponent,
    ListShowComponent,
    ConsultantFormComponent,
    MatAutocompleteComponent,
    MatDragAndDropComponent,
    MatDatepickerComponent,
    ReactiveFormArrayComponent,
    MatSelectComponent,
    ConfirmationDialogComponent,
    ControlMessagesComponent,
    ConsultantCompetencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMomentDateModule,
    RxReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
