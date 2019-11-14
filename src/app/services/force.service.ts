import { Injectable } from '@angular/core';
import { ForceItem } from '../classes';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ForceService  extends CrudService<ForceItem>  {

  constructor(httpClient: HttpClient) { 
    super(httpClient, `force`);
  }
}
