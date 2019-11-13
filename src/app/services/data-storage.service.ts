import { Injectable } from '@angular/core';
import { Consultant } from '../classes';
import { Observable, of } from 'rxjs';
import { ConsultantService } from './consultant.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  consultant: Consultant;

  constructor(
    private consultantService: ConsultantService
    ) { }

  getConsultant(id: number): Observable<Consultant>{
    if(this.consultant.id == id){
      return of(this.consultant);
    }
    else{
      return this.consultantService.read(id);
    }

  }
}
