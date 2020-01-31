import { Component, OnInit } from '@angular/core';
import { GroupService} from '../services/group.service';
import { Consultant, InformaticCompetence, CompetenceGroup, CompetenceItem } from '../classes';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ConsultantService } from '../services/consultant.service';
import { CompetenceService } from '../services/competence.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-competence-form',
  templateUrl: './competence-form.component.html',
  styleUrls: ['./competence-form.component.css']
})
export class CompetenceFormComponent implements OnInit {

  headElements = ['Competence','Niveau', 'Expérience', 'Dernière utilisaton', 'Contexte','Intérêt'];
  keysToShow = ["niveau", "experience", "annee", "contexte","interet"];
  consultant: Consultant;
  compConsultant: InformaticCompetence[];
  id: number;
  show: boolean;
  competencesForm: FormGroup;

  constructor(
    private dataStorageService: DataStorageService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) 
  {
      this.show=false;
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.dataStorageService.getConsultant(this.id)
    .subscribe(result=>
      {
        this.consultant=result;
        this.compConsultant = result.competences;
        this.createForm();
        this.patchForm();
      });
  }

  createForm(){
    this.competencesForm = this.fb.group({
        competences: this.fb.array([])
       });
  }   

  createCompetenceItem(n: number, item: CompetenceItem, competenceConsultant: InformaticCompetence){
    return this.fb.group({
      n: n,
      id: item.id,
      description: item.description,
      parent2: this.fb.group(item.parent2),
      competenceConsultant: this.fb.group(competenceConsultant)
    });
  }

  patchForm(){    
    this.dataStorageService.getCompetenceItems().subscribe(
      items =>
      {
        let i=0;
        items.forEach(
          item => 
          {    
            let competenceConsultant = new InformaticCompetence();
            for(let x of this.compConsultant)
            {            
              if(x.parent2.id==item.id)
              {   
                competenceConsultant = x;
                this.compConsultant = this.compConsultant.filter(item => item !== x);
                break;
              }
            }
            (<FormArray>this.competences).push(this.createCompetenceItem(i, item, competenceConsultant));
            i=i+1;
          }
        );
      },
      err => 
      {
        console.log(err);
      },
      () =>
      {
        this.show = true;
        console.log(this.competencesForm);
      }
    );
  }

  get competences(){
    return this.competencesForm.get('competences') as FormArray;
  }

  onSubmit(){
    // this.consultant.competences = new Array<InformaticCompetence>();
    // this.groups.controls.forEach(
    //   group => {
    //     (<FormArray>group.get('items')).controls.forEach(
    //       item => {
    //         //if(item.dirty){
    //           let competenceConsultant = item.get('item').value;
    //           competenceConsultant.parent2.description = item.value.description;
    //           competenceConsultant.parent2.parent2 = {"id": group.value.group_id, "description": group.value.group_description};
    //           this.consultant.competences.push(competenceConsultant);
    //           //this.competenceService.update(item.get('item').value).subscribe();
    //         //}
    //       }
    //     )
    //   }
    // )
    // this.dataStorageService.consultant = this.consultant;
    // this.router.navigate([`edit/${this.id}`]);
  }
  
  empty(item) {    
    item.patchValue({competenceConsultant: new InformaticCompetence()});    
  }
}
