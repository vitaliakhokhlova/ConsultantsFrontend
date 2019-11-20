import { Component, OnInit, Input } from '@angular/core';
import { Consultant, CompetenceGroup, CompetenceItem } from '../classes';
import { ActivatedRoute } from '@angular/router';
import { ConsultantService} from '../services/consultant.service';

@Component({
  selector: 'app-consultantdetail',
  templateUrl: './consultantdetail.component.html',
  styleUrls: ['./consultantdetail.component.css']
})

export class ConsultantdetailComponent implements OnInit {

  consultant: Consultant;
  age: number;
  groups: Array<CompetenceGroup>;

  constructor(
    private route: ActivatedRoute,
    private consultantService: ConsultantService
  ) { }

  ngOnInit() {
    this.getConsultant();
  }

  getConsultant(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id === 0){
      this.consultant = new Consultant();
    }
    else{
      this.consultantService.read(id).subscribe(results => 
        {
          this.consultant = results; 
          this.calculateAge();
          this.makeGroups();
        }
      );
    }
  }
  
  calculateAge(){
    this.age = new Date().getFullYear() - new Date(this.consultant.birthday).getFullYear();	  
  }

  makeGroups(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.groups = new Array<CompetenceGroup>();
    if(id != 0){      
      this.consultantService.getGroupedCompetences(id).subscribe(results => 
        {
          for(let c of results){
            let g = c.parent2;
            let exists = this.groups.filter(x => x.id == g.id)[0];
            if(exists){
              exists.items.push(c);
            }
            else{
              g.items = new Array<CompetenceItem>();
              g.items.push(c);
              this.groups.push(g);
            }            
            
          } 
        }
      );
    }
  }
}
