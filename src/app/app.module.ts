import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


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
} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultantdetailComponent } from './consultantdetail/consultantdetail.component';
import { ConsultantSearchComponent } from './consultant-search/consultant-search.component';
import { CompetenceFormComponent } from './competence-form/competence-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteComponent } from './form-elements/mat-autocomplete/mat-autocomplete.component';
import { ListShowComponent } from './list-show/list-show.component';
import { ListEditComponent } from './list-edit/list-edit.component';
import { InputFormEditorComponent } from './input-form-editor/input-form-editor.component';
import { GroupByPipe } from './pipes/group.pipe';
import { MatDragAndDropComponent } from './form-elements/mat-drag-and-drop/mat-drag-and-drop.component';
import { MatDatepickerComponent } from './form-elements/mat-datepicker/mat-datepicker.component';
import { ReactiveFormArrayComponent } from './form-elements/reactive-form-array/reactive-form-array.component';
import { MatSelectComponent } from './form-elements/mat-select/mat-select.component';
import {MatSortModule} from '@angular/material/sort';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsultantdetailComponent,
    ConsultantSearchComponent,
    CompetenceFormComponent,
    ListShowComponent,
    ListEditComponent,
    InputFormEditorComponent,
    GroupByPipe,
    MatAutocompleteComponent,
    MatDragAndDropComponent,
    MatDatepickerComponent,
    ReactiveFormArrayComponent,
    MatSelectComponent,
    ConfirmationDialogComponent
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
