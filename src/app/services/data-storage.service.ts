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
    if(id == 0){
      console.log("creating new consultant");
      this.consultant = new Consultant();
      return of(this.consultant);
    }
    else
    {
      if(this.consultant && this.consultant.id == id){
        return of(this.consultant);
      }
      else{
        return this.consultantService.read(id);
      }
    }
  }
}
