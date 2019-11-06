import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../services/crud.service';
import { Consultant, CompetenceGroup } from '../classes';
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

public getGroupedEmptyCompetences(id: number): Observable<CompetenceGroup[]> {
	return this.httpClient.get<CompetenceGroup[]>(`${this.urlcomplete}/${id}/grouped_empty_competences`);
	}
}
