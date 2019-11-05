import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../services/crud.service';
import { CompetenceGroup } from '../classes';


@Injectable({
  providedIn: 'root'
})

export class GroupService extends CrudService<CompetenceGroup> {

  constructor(httpClient: HttpClient) 
		{ 
		  super(httpClient, `group`);
		}
}
