import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../services/crud.service';
import { Consultant, CompetenceGroup, Competence, CompetenceItem, InformaticCompetence } from '../classes';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ConsultantService extends CrudService<Consultant> {

  constructor(httpClient: HttpClient) 
		{ 
		  super(httpClient, `consultant`, Consultant);
		}

	public getGroupedCompetences(id: number): Observable<CompetenceItem[]> {
		return this.httpClient.get<CompetenceItem[]>(`${this.urlcomplete}/${id}/nongrouped_competences`);
		}

	public getCompetences(id: number): Observable<InformaticCompetence[]> {
		return this.httpClient.get<InformaticCompetence[]>(`${this.urlcomplete}/${id}/competences`);
		}

	public searchByCompetences(value: string): Observable<CompetenceItem[]> {
		return this.httpClient.get<CompetenceItem[]>(`${this.urlcomplete}/search_by_competence/${value}`);
		}
}
