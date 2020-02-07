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
  MatIconModule
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
import { MatAutocompleteComponent } from './mat-autocomplete/mat-autocomplete.component';
import { ListShowComponent } from './list-show/list-show.component';
import { ListEditComponent } from './list-edit/list-edit.component';
import { InputFormEditorComponent } from './input-form-editor/input-form-editor.component';
import { GroupByPipe } from './pipes/group.pipe';
import { MatDragAndDropComponent } from './mat-drag-and-drop/mat-drag-and-drop.component';
import { MatDatepickerComponent } from './mat-datepicker/mat-datepicker.component';
import { ReactiveFormArrayComponent } from './reactive-form-array/reactive-form-array.component';


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
    ReactiveFormArrayComponent
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
    RxReactiveFormsModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
