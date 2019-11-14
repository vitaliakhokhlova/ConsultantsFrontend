import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import {MatSelectModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultantsComponent } from './consultants/consultants.component';
import { ConsultantdetailComponent } from './consultantdetail/consultantdetail.component';
import { ConsultantEditComponent } from './consultant-edit/consultant-edit.component';
import { ConsultantSearchComponent } from './consultant-search/consultant-search.component';
import { CompetenceFormComponent } from './competence-form/competence-form.component';
import { HistoryEditComponent } from './history-edit/history-edit.component';
import { ForceChoiceComponent } from './force-choice/force-choice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DateComponent } from './date/date.component';
import { LangueChoiceComponent } from './langue-choice/langue-choice.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsultantsComponent,
    ConsultantdetailComponent,
    ConsultantEditComponent,
    ConsultantSearchComponent,
    CompetenceFormComponent,
    HistoryEditComponent,
    ForceChoiceComponent,
    DateComponent,
    LangueChoiceComponent
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
    DragDropModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
