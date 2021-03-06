import { Injectable } from '@angular/core';
import { InformaticCompetence } from '../classes';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService extends CrudService<InformaticCompetence> {

  constructor(httpClient: HttpClient) 
  { 
    super(httpClient, `competence`, InformaticCompetence);
  }
}
