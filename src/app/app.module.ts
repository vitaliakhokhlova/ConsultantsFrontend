import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultantsComponent } from './consultants/consultants.component';
import { ConsultantdetailComponent } from './consultantdetail/consultantdetail.component';
import { ConsultantEditComponent } from './consultant-edit/consultant-edit.component';
import { ConsultantSearchComponent } from './consultant-search/consultant-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsultantsComponent,
    ConsultantdetailComponent,
    ConsultantEditComponent,
    ConsultantSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
