import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultantdetailComponent } from './consultantdetail/consultantdetail.component';
import {ConsultantEditComponent} from './consultant-edit/consultant-edit.component';
import { ConsultantSearchComponent } from './consultant-search/consultant-search.component';
import { CompetenceFormComponent} from './competence-form/competence-form.component';

const routes: Routes = [
  { path: 'search', component: ConsultantSearchComponent },
  { path: 'detail/:id', component: ConsultantdetailComponent },
  { path: 'edit/:id', component: ConsultantEditComponent },
  { path: 'competences/:id', component: CompetenceFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
