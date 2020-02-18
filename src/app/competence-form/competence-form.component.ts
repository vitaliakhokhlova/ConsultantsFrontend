import { Component, OnInit } from '@angular/core';
import { GroupService} from '../services/group.service';
import { Consultant, InformaticCompetence, CompetenceGroup, CompetenceItem } from '../classes';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
  idConsultant: number;
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
    this.idConsultant = +this.route.snapshot.paramMap.get('id');
    this.createForm();
    this.dataStorageService.getConsultant(this.idConsultant)
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

  createGroupedCompetence(): FormGroup{
    return this.fb.group({
      n: '',
      id: '',
      description: '',
      parent2: this.fb.group({id: 0, description: ''}),
      competenceConsultant: this.fb.group({
        id: '',
        niveau: ['', [Validators.min(0), Validators.max(9)]],
        experience: ['', [Validators.min(0), Validators.max(100)]],
        annee: ['', [Validators.max((new Date()).getFullYear())]],
        interet: '',
        contexte: ''
      })
    })
  } 

  patchForm(consultant: Consultant){    
    let comp = consultant.competences;
    this.dataStorageService.getCompetenceItems().subscribe(
      items =>
      {
        let i=0;
        items.forEach(
          item => 
          {    
            let competenceConsultant = new InformaticCompetence();
            competenceConsultant.parent = {id: this.idConsultant};
            competenceConsultant.parent2 = {id: item.id};
            for(let x of comp)
            {            
              if(x.parent2.id==item.id)
              {   
                competenceConsultant = x;
                comp = comp.filter(item => item !== x);
                break;
              }
            }
            let groupedCompetence = this.createGroupedCompetence();
            groupedCompetence.patchValue({n: i, id: item.id, description: item.description, parent2: item.parent2, competenceConsultant: competenceConsultant});
            (<FormArray>this.competences).push(groupedCompetence);
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


  addCompetence(group_id: number){
    console.log(group_id);
    let competenceConsultant = new InformaticCompetence();
    competenceConsultant.parent = {id: this.idConsultant};
    let groupedCompetence = this.createGroupedCompetence();
    let value = {
      n: this.competences.length, 
      id: 0, 
      description: '', 
      parent2: {id: group_id}, 
      competenceConsultant: competenceConsultant};
    groupedCompetence.patchValue(value);
    this.competences.push(groupedCompetence);
    // let form = this.competencesForm.getRawValue();
    // console.log(form);
    // form.competences.push(value);
    // this.createForm();
    // console.log(form);
    // this.competencesForm.patchValue(form);      
    // console.log(this.competencesForm);
  }

}
