import { Component, OnInit } from '@angular/core';
import { Consultant } from '../classes';
import { ConsultantService} from '../services/consultant.service';

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.css']
})
export class ConsultantsComponent implements OnInit {

  headElements = ['ID', 'Prénom', 'Nom', 'Métier'];
  consultants: Consultant[];
  constructor(private consultantService: ConsultantService) { }

  ngOnInit() {
    this.getAllConsultants();
  }

  getAllConsultants(){
    this.consultantService.readAll().subscribe(results => this.consultants = results);
  }

}
