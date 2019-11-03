import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../services/crud.service';
import { Consultant } from '../classes';


@Injectable({
  providedIn: 'root'
})

export class ConsultantService extends CrudService<Consultant> {

  constructor(httpClient: HttpClient) 
		{ 
		  super(httpClient, `consultant`);
		}
}
