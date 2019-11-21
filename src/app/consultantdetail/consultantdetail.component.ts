import { Component, OnInit, Input } from '@angular/core';
import { Consultant, CompetenceGroup, CompetenceItem } from '../classes';
import { ActivatedRoute } from '@angular/router';
import { ConsultantService} from '../services/consultant.service';
import { DataStorageService } from '../services/data-storage.service';

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
    private consultantService: ConsultantService,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataStorageService.getConsultant(id)
    .subscribe(result=>
      {
        this.consultant=result;
        this.calculateAge(result);
        this.makeGroups(result);
      });  
  }

  // getConsultant(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   if(id === 0){
  //     this.consultant = new Consultant();
  //   }
  //   else{
  //     this.consultantService.read(id).subscribe(results => 
  //       {
  //         this.consultant = results; 
  //         this.calculateAge();
  //         this.makeGroups();
  //       }
  //     );
  //   }
  // }
  
  calculateAge(consultant: Consultant){
    this.age = new Date().getFullYear() - new Date(consultant.birthday).getFullYear();	  
  }

  makeGroups(consultant: Consultant){    
    this.groups = new Array<CompetenceGroup>(); 
    for(let c of consultant.competences){
      let newGroup = c.parent2.parent2;
      let existingGroup = this.groups.filter(x => x.id == newGroup.id)[0];
      if(existingGroup){
        existingGroup.items.push(c.parent2);
      }
      else{
        newGroup.items = new Array<CompetenceItem>();
        newGroup.items.push(c.parent2);
        this.groups.push(newGroup);
      }      
    } 
      
  }
}
