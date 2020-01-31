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
  id: number;
  show: boolean;
  competencesForm: FormGroup;


  constructor(
    private dataStorageService: DataStorageService,
    private consultantService: ConsultantService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) 
  {
      this.show=false;
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.createForm();
    this.dataStorageService.getConsultant(this.id)
    .subscribe(result=>
      {
        this.consultant=result;       
        this.patchForm(result);
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

  patchForm(result){    
    let comp = result.competences;
    this.dataStorageService.getCompetenceItems().subscribe(
      items =>
      {
        let i=0;
        items.forEach(
          item => 
          {    
            let competenceConsultant = new InformaticCompetence();
            for(let x of comp)
            {            
              if(x.parent2.id==item.id)
              {   
                competenceConsultant = x;
                comp = comp.filter(item => item !== x);
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
    this.consultant.competences = [];
    this.competences.value.forEach(
      x =>
      {
        if(x.competenceConsultant.niveau!=0)
        {
          this.consultant.competences.push(x.competenceConsultant);
        }
      }
    );
    this.consultantService.update(this.consultant).subscribe(result=>{
      this.dataStorageService.consultant = result;
      this.router.navigate([`detail/${result.id}`]);
     });   
  }
  
  empty(item) {    
    item.patchValue({competenceConsultant: new InformaticCompetence()});    
  }
}
