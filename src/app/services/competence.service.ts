import { Injectable } from '@angular/core';
import { Competence } from '../classes';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService extends CrudService<Competence> {

  constructor(httpClient: HttpClient) 
  { 
    super(httpClient, `competence`, Competence);
  }
}
