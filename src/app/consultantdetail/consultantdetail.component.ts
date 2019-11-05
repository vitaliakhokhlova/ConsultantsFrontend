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
    let groupIDs: number[];
    this.groups = new Array();
    groupIDs=Array.from(new Set(this.consultant.competences.map((item: any) => item.parent2.parent2.id)));
    for (let id of groupIDs){
      let group: CompetenceGroup = new CompetenceGroup();
      group.id = id;
      group.competenceItems = new Array();
      for (let c of this.consultant.competences){
        if (c.parent2.parent2.id==id){
            let competenceItem: CompetenceItem = new CompetenceItem();
            competenceItem.id = c.parent2.id;
            competenceItem.description = c.parent2.description;
            group.description=c.parent2.parent2.description;
            group.competenceItems.push(competenceItem);
        }
      }
    this.groups.push(group);
    }
  }
}
