import { Injectable } from '@angular/core';
import { CompetenceItem } from '../classes';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompetenceItemService extends CrudService<CompetenceItem> {

  constructor(httpClient: HttpClient) 
  { 
    super(httpClient, `competence_item`, CompetenceItem);
  }
}
