import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultantsComponent } from './consultants/consultants.component';
import { ConsultantdetailComponent } from './consultantdetail/consultantdetail.component';
import {ConsultantEditComponent} from './consultant-edit/consultant-edit.component';
import { ConsultantSearchComponent } from './consultant-search/consultant-search.component';

const routes: Routes = [
  { path: 'list',  component: ConsultantsComponent  },
  { path: 'search', component: ConsultantSearchComponent },
  { path: 'detail/:id', component: ConsultantdetailComponent },
  { path: 'edit/:id', component: ConsultantEditComponent },
  { path: 'add', component: ConsultantEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
