import { Component, OnInit } from '@angular/core';
import { GroupService} from '../services/group.service';
import { CompetenceGroup, Consultant, CompetenceItem, InformaticCompetence } from '../classes';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ConsultantService } from '../services/consultant.service';

@Component({
  selector: 'app-competence-form',
  templateUrl: './competence-form.component.html',
  styleUrls: ['./competence-form.component.css']
})
export class CompetenceFormComponent implements OnInit {

  headElements = ['Competence','Niveau', 'Expérience', 'Dernière utilisaton', 'Contexte','Intérêt'];
  keysToShow = ["niveau", "experience", "annee", "contexte","interet"];
  //groups: CompetenceGroup[];
  consultant: Consultant;
  id: number;
  show: boolean;
  competencesForm: FormGroup;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private consultantService: ConsultantService,
    private fb: FormBuilder
  ) {
      this.show=false;
   }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.createForm();
    this.patchForm(this.id);
  };

  createForm(){
    this.competencesForm = this.fb.group({
      groups: this.fb.array([this.createCompetenceItem()])
    });
  }

  patchForm(id: number){
    this.groupService.getAll().subscribe(allGroups =>
      {
        this.groups.clear();
        allGroups.forEach(group => {
          this.groups.push(this.createGroup(group));
        });
      },
      err => {
        console.log(err);
      },
      () => {
        this.consultantService.getCompetences(id).subscribe(response=>
          {
            this.fillCompetences(response);
          }
        );
      }
    );
   
    // this.consultantService.getCompetences(id).subscribe(response=>
    //   {
    // response.forEach(x=>
    //   {
    //     const group = this.fb.group({
    //       group_id: x.parent2.parent2.id,
    //       group_description: x.parent2.parent2.description,
    //       items: this.fb.array([{
    //         id: x.id, 
    //         parent2: x.parent2, 
    //         niveau: x.niveau}])
    //     });
    //     this.groups.push(group);
    //     console.log(this.competencesForm);
    //   })});
  }

  get groups(){
    return this.competencesForm.get('groups') as FormArray;
  }

  createGroup(group): FormGroup {
    const formGroup = this.fb.group({
      group_id: group.id,
      group_description: group.description,
      items: this.fb.array([])
    });
    group.items.forEach(x => {
      const competenceItem = this.fb.group({
        id: x.id,
        description: x.description,
        item: this.fb.group({
          id: 0,
          experience: 0,
          annee: 0,
          contexte: '',
          interet: '',
          niveau: '',
          parent2: {id: x.id},
          parent: {id: this.id}
        })
        });
      (<FormArray>formGroup.get('items')).push(competenceItem);
    });
    return formGroup;
  }
  
  createCompetenceItem(){
    return this.fb.group({
      id: 0,
      description: '',
      item: this.fb.group({
        parent: {id: ''},
        experience: '',
        annee: '',
        contexte: '',
        interet: '',
        niveau: '',
        parent2: {id: ''}
      })
    });
  }

  fillCompetences(competenceArray){
    competenceArray.forEach(competenceConsultant => {
      this.groups.controls.forEach(groupForm => {
        if(competenceConsultant.parent2.parent2.id==groupForm.value.group_id){
          (<FormArray>groupForm.get('items')).controls.forEach(z => {
            if(competenceConsultant.parent2.id==z.value.id){
              z.patchValue({item: {
                parent: {id: this.id},
                experience: competenceConsultant.experience,
                annee: competenceConsultant.annee,
                contexte: competenceConsultant.contexte,
                interet: competenceConsultant.interet,
                niveau: competenceConsultant.niveau,
                parent2: {id: competenceConsultant.parent2.id}
              }
              });
            }
          })
        }
      });
    });
    this.show = true;
  }

  // getAllGroups(consultant: Consultant): void{
  //   this.groupService.getAll().subscribe(
  //     results => {
  //       this.groups = results; 
  //       this.fillgroups(consultant);
  //     }
  //    );
  // }

  // fillgroups(consultant: Consultant){      
  //   for(let gc of this.groups){
  //     for(let i of gc.items){
  //       i.items = new Array<InformaticCompetence>();
  //       let competence = new InformaticCompetence();
  //       i.items.push(competence);        
  //       if(consultant.competences){ 
  //         for (let c of consultant.competences){
  //           if(i.id==c.parent2.id){ 
  //             i.items[0]=c;           
  //           }
  //         }  
  //       }   
  //     }
  //   }        
  //   this.show=true;    
  // }

  // save(): void {      
  //   console.log("saving competences");
  //   for(let gc of this.groups){
  //     for(let i of gc.items){   
  //       if(Object.keys(i.items[0]).length){
  //         if(i.items[0].id === undefined)
  //         {
  //           i.items[0].parent2 = new CompetenceItem();
  //           i.items[0].parent2.id = i.id;
  //           this.consultant.competences.push(i.items[0]);
  //         }   
  //       }
  //     }
  //   }
  //   this.dataStorageService.consultant = this.consultant;
  // }

  
  // delete(competence: CompetenceItem): void {    
  //   this.consultant.competences =  this.consultant.competences.filter(x => x !== competence.items[0]);
  //   competence.items[0] = new Competence();
  // }
}
