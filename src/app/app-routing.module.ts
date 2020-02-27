import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultantProfileComponent } from './consultant-profile/consultant-profile.component';
import { ConsultantSearchComponent } from './consultant-search/consultant-search.component';
import { CompetenceFormComponent} from './competence-form/competence-form.component';
import { ConsultantFormComponent } from './consultant-form/consultant-form.component';
import { ConsultantCompetencesComponent } from './consultant-competences/consultant-competences.component';

const routes: Routes = [
  { path: '', component: ConsultantSearchComponent },
  { path: 'search', component: ConsultantSearchComponent },
  { path: 'detail/:id', component: ConsultantProfileComponent },
  { path: 'edit/:id', component: ConsultantFormComponent,  runGuardsAndResolvers: 'always' },
  { path: 'competences/:id', component: ConsultantCompetencesComponent},
  { path: 'edit_competences/:id', component: CompetenceFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
