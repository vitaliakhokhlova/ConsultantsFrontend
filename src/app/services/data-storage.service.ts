import { Injectable } from '@angular/core';
import { Consultant, LangueItem, ForceItem, CompetenceItem } from '../classes';
import { Observable, of } from 'rxjs';
import { ConsultantService } from './consultant.service';
import { LangueService } from './langue.service';
import { ForceService } from './force.service';
import { CompetenceItemService } from './competence-item.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  consultant: Consultant;
  langues: Array<LangueItem>;
  forces: Array<ForceItem>;
  competenceItems: Array<CompetenceItem>;

  competenceHeader = [
    {property: "niveau", placeholder: "Niveau"},
    {property: "experience", placeholder: "Expérience"},
    {property: "annee", placeholder: "Dernière utilisation"},
    {property: "contexte", placeholder: "Contexte"},
    {property: "interet", placeholder: "Intérêt"}
  ];

  constructor(
    private consultantService: ConsultantService,
    private langueService: LangueService,
    private forceService: ForceService,
    private competenceItemService: CompetenceItemService
    ) { }

  getConsultant(id: number): Observable<Consultant>{
    if(id == 0){
      console.log("creating new consultant");
      this.consultant = new Consultant();
      return of(this.consultant);
    }
    else
    {
      if(this.consultant && this.consultant.id == id){
        return of(this.consultant);
      }
      else{
        return this.consultantService.read(id);
      }
    }
  }

  getLangues(): Observable<LangueItem[]>{
    if(this.langues){
      return of(this.langues);
    }
    else{
      return this.langueService.getAllOrdered("description");
    }
  }

  getCompetenceItems(): Observable<CompetenceItem[]>{
    if(this.competenceItems){
      return of(this.competenceItems);
    }
    else{
      return this.competenceItemService.getAll();
    }
  }

  getForces(): Observable<ForceItem[]>{
    if(this.forces){
      return of(this.forces);
    }
    else{
      return this.forceService.getAll();
    }
  }
}
