import { Component, OnInit } from '@angular/core';
import { GroupService} from '../services/group.service';
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
    private route: ActivatedRoute,
    private dataService: DataStorageService
  ) {
      this.show=false;
   }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.consultant = this.dataService.getConsultant(id);
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
        i.items.push(new Competence()); 
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
        if(!i.items[0].id){
          i.items[0].parent2 = new CompetenceItem();
          i.items[0].parent2.id = i.id;
          this.dataService.consultant.competences.push(i.items[0]);          
        }
  }}}

  
  delete(competence: CompetenceItem): void {    
    this.consultant.competences =  this.consultant.competences.filter(x => x !== competence.items[0]);
    competence.items[0] = new Competence();
  }

}
