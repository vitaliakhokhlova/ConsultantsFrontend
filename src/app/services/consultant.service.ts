import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../services/crud.service';
import { Consultant, CompetenceGroup, Competence } from '../classes';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ConsultantService extends CrudService<Consultant> {

  constructor(httpClient: HttpClient) 
		{ 
		  super(httpClient, `consultant`);
		}

public getGroupedCompetences(id: number): Observable<CompetenceGroup[]> {
	return this.httpClient.get<CompetenceGroup[]>(`${this.urlcomplete}/${id}/grouped_competences`);
	}

public getCompetences(id: number): Observable<Competence[]> {
	return this.httpClient.get<Competence[]>(`${this.urlcomplete}/${id}/competences`);
	}
}
