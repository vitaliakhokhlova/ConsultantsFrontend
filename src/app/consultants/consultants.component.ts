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
  items: Consultant[];
  constructor(private consultantService: ConsultantService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.consultantService.getAll().subscribe(results => this.items = results);
  }

  delete(consultant: Consultant): void {
    this.items = this.items.filter(h => h !== consultant);
    this.consultantService.delete(consultant.id).subscribe();
  }

}
