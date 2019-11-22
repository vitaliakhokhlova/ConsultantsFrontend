import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
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
import { ConsultantEditComponent } from './consultant-edit/consultant-edit.component';
import { ConsultantSearchComponent } from './consultant-search/consultant-search.component';
import { CompetenceFormComponent } from './competence-form/competence-form.component';
import { ForceChoiceComponent } from './force-choice/force-choice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DateComponent } from './date/date.component';
import { LangueChoiceComponent } from './langue-choice/langue-choice.component';
import { ListShowComponent } from './list-show/list-show.component';
import { CompetenceSearchComponent } from './competence-search/competence-search.component';
import { ListEditComponent } from './list-edit/list-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ConsultantdetailComponent,
    ConsultantEditComponent,
    ConsultantSearchComponent,
    CompetenceFormComponent,
    ForceChoiceComponent,
    DateComponent,
    LangueChoiceComponent,
    ListShowComponent,
    CompetenceSearchComponent,
    ListEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMomentDateModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
