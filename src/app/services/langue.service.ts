import { Injectable } from '@angular/core';
import { LangueItem } from '../classes';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LangueService extends CrudService<LangueItem> {

  constructor(httpClient: HttpClient) 
  { 
    super(httpClient, `langue`, LangueItem);
  }
}
