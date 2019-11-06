import { Component, OnInit } from '@angular/core';
import { ConsultantService} from '../services/consultant.service';
import { CompetenceGroup, Consultant, CompetenceItem, Competence } from '../classes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-competence-form',
  templateUrl: './competence-form.component.html',
  styleUrls: ['./competence-form.component.css']
})
export class CompetenceFormComponent implements OnInit {

  headElements = ['Competence','Niveau', 'Expérience', 'Dernière utilisaton', 'Contexte','Intérêt'];
  items: CompetenceGroup[];
  consultant: Consultant;

  constructor(
    private route: ActivatedRoute,
    private consultantService: ConsultantService
  ) { }

  ngOnInit() {
    const id = +this.route.params.subscribe(
      result=>{
        this.getConsultant(result.id);
        this.getGroupedEmptyCompetences(result.id);
      }
    );
  };

  getGroupedEmptyCompetences(id: number){
    this.consultantService.getGroupedEmptyCompetences(id).subscribe(
      results => {
        this.items = results;
        this.fillItems();
      }
      );
  }

  fillItems(){
    for (let group of this.items){
      for(let competence_item of group.items){
        console.log(competence_item);
        console.log(competence_item.items);
          if(!competence_item.items.length){
            console.log("I am here");
              competence_item.items.push(new Competence());
              console.log(competence_item.items);
          }
          }
      }
    }
  

  getConsultant(id: number): void {    
    if(id == 0){
      this.consultant = new Consultant();
      console.log(this.consultant.id);
    }
    else{
      this.consultantService.read(id).subscribe(results => 
        {
            this.consultant = results; 
        }
      );
    }
  }

  // save(): void {      
  //   console.log("saving competences");
  //   this.consultant.competences = new CompetenceItem()[]();
  //   for (let group of this.items){
  //     for (let competence of group.items){
  //       for (let competence of group.items){

  //       this.consultant.competences.push(competence);
  //   }
  //   this.consultant.competences=this.items.items;
  //   this.consultantService.update(this.consultant).subscribe(result=>this.consultant=result);
  // }}}
     

}
