import { Component, OnInit, Input } from '@angular/core';
import { Consultant, CompetenceGroup, CompetenceItem } from '../classes';
import { ActivatedRoute, Router } from '@angular/router';
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
  photoname: any;
  pictrogram: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataStorageService.getConsultant(id)
    .subscribe(result=>
      {
        this.consultant=result;
        this.calculateAge(result);
        this.makeCompetenceGroups(result);    
      });  
  }

  calculateAge(consultant: Consultant){
    let ms = new Date().valueOf() - new Date(consultant.birthday).valueOf();
    this.age =Math.floor((ms / (1000 * 3600 * 24))/365.25);;	  
  }

  makeCompetenceGroups(consultant: Consultant){    
    this.groups = new Array<CompetenceGroup>(); 
    if(consultant.competences){
      for(let competence of consultant.competences){
        let newGroup = new CompetenceGroup();
        if(typeof competence.parent2.parent2 === 'number')
        {
          newGroup.id=competence.parent2.parent2;
        }   
        else{
          newGroup.id=competence.parent2.parent2.id;
          newGroup.description = competence.parent2.parent2.description;
        }  
        let existingGroup = this.groups.filter(x => x.id == newGroup.id)[0];
        if(existingGroup){
          existingGroup.items.push({description: competence.parent2.description});
          if(!existingGroup.description && newGroup.description){
            existingGroup.description = newGroup.description;
          }
        }
        else{
          newGroup.items = new Array<CompetenceItem>();
          newGroup.items.push({description: competence.parent2.description});
          this.groups.push(newGroup);
        }      
      } 
    }   
    console.log(this.groups);   
  }

  goTo(route: string){
    this.router.navigate([route]);
  }

  onPrint(){
    window.print();
}
}
