import { Component, OnInit } from '@angular/core';
import { GroupService} from '../services/group.service';
import { CompetenceService} from '../services/competence.service';
import { CompetenceGroup, Consultant, CompetenceItem, Competence } from '../classes';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from "../services/data-storage.service";

@Component({
  selector: 'app-competence-form',
  templateUrl: './competence-form.component.html',
  styleUrls: ['./competence-form.component.css']
})
export class CompetenceFormComponent implements OnInit {

  headElements = ['Competence','Niveau', 'Expérience', 'Dernière utilisaton', 'Contexte','Intérêt'];
  groups: CompetenceGroup[];
  consultant: Consultant;
  id: number;
  show: boolean;

  constructor(
    private groupService: GroupService,
    private competenceService: CompetenceService,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {
      this.show=false;
   }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataStorageService.getConsultant(id).subscribe(result=>this.consultant = result);
    this.getAllGroups(); 
  };

  getAllGroups(): void{
    this.groupService.getAll().subscribe(
      results => {
        this.fillgroups(results);
      }
     );
  }

  fillgroups(groups: CompetenceGroup[]){  
    this.groups = groups; 
    for(let gc of this.groups){
      for(let i of gc.items){
        i.items = new Array<Competence>();
        let competence = new Competence();
        i.items.push(competence);        
        if(this.consultant.competences){ 
          for (let c of this.consultant.competences){
            if(i.id==c.parent2.id){ 
              i.items[0]=c;           
            }
          }  
        }   
      }
    }        
    this.show=true;    
  }

  save(): void {      
    console.log("saving competences");
    for(let gc of this.groups){
      for(let i of gc.items){   
        if(Object.keys(i.items[0]).length){
          let c = new Competence();
          c=i.items[0];
          console.log(c);
          c.parent = new Consultant();
          c.parent.id = this.consultant.id;
          c.parent2 = new CompetenceItem();
          c.parent2.id = i.id;
          console.log(c);
          this.competenceService.create(c).subscribe(result=>console.log(result));
        }   
      }
    }
  }

  
  delete(competence: CompetenceItem): void {    
    this.consultant.competences =  this.consultant.competences.filter(x => x !== competence.items[0]);
    competence.items[0] = new Competence();
  }

}
