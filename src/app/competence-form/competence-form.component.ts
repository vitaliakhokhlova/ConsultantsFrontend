import { Component, OnInit } from '@angular/core';
import { GroupService} from '../services/group.service';
import { Consultant, InformaticCompetence, CompetenceGroup, CompetenceItem } from '../classes';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ConsultantService } from '../services/consultant.service';
import { CompetenceService } from '../services/competence.service';
import { DataStorageService } from '../services/data-storage.service';
import { CompetenceItemService } from '../services/competence-item.service';
import { Observable, forkJoin } from 'rxjs';

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
    private competenceItemService: CompetenceItemService,
    private groupService: GroupService,
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
        groups: this.fb.array([])
       });
  }  

  get groups(): FormArray{
    return this.competencesForm.get('groups') as FormArray;
  }
  
  newGroup(): FormGroup{
    return this.fb.group({
      id: 0,
      description: '',
      items: this.fb.array([])
    });
  }

  newCompetenceItem(): FormGroup{
    return this.fb.group({
      id: 0,
      description: ['', Validators.required],
      consultantCompetence: this.newConsultantCompetence()
    });
  }

  newConsultantCompetence(){
    return this.fb.group({
      id: 0,
      niveau: ['', [Validators.min(0), Validators.max(9)]],
      experience: ['', [Validators.min(0), Validators.max(100)]],
      annee: ['', [Validators.max((new Date()).getFullYear())]],
      interet: '',
      contexte: ''
    });
  }

  patchForm(consultant: Consultant){    
    let comp = consultant.competences;
    this.groupService.getAll().subscribe(
      groups =>
      {
        let i=0;
        groups.forEach(
          group => 
          {    
            let newGroup = this.newGroup();
            newGroup.patchValue(group);
            group.items.forEach(
              item =>
              {
                let newItem = this.newCompetenceItem();
                newItem.patchValue(item);
                for(let consultantCompetence of comp)
                {          
                  if(consultantCompetence.parent2.id==item.id)
                  {   
                    let newCompetenceConsultant = this.newConsultantCompetence();
                    newCompetenceConsultant.patchValue(consultantCompetence);
                    newItem.controls.consultantCompetence = newCompetenceConsultant;
                    comp = comp.filter(item => item !== consultantCompetence);
                    break;
                  }
                }
                (<FormArray>newGroup.controls.items).push(newItem);
              }
            )
            this.groups.push(newGroup);
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

  onSubmit(){
    this.consultant.competences = [];
    let newObservableCompetenceItems = new Array<Observable<CompetenceItem>>();
    this.groups.value.forEach(
      group =>
      {
        group.items.forEach(
          item =>
          {
            //if(item.id==0)
            // {
            //   let newCompetence = {description: x.description, parent2:{id: group.id}};
            //   newObservableCompetenceItems.push(this.competenceItemService.create(newCompetence));
              
            // }
            if(item.consultantCompetence.niveau!=0)
            {
              item.consultantCompetence.parent = {id: this.idConsultant};
              item.consultantCompetence.parent2={
              id: item.id, 
              description: item.description,
              parent2: {id: group.id}};
              this.consultant.competences.push(item.consultantCompetence);
            }
          }
        )
      }
    );
    // forkJoin(newObservableCompetenceItems).subscribe(
    //   newCompetenceItems => 
    // {
    //   newCompetenceItems.forEach(x =>
    //     {
    //       x.id = result.id;
    //     })
    // },
    // err => console.log(err),
    // () => {
    //   if(x.consultantCompetence.niveau!=0)
    //   {
    //     x.consultantCompetence.parent2={id: x.id, description: x.description};
    //     this.consultant.competences.push(x.consultantCompetence);
    //   }
    // });	 
    // );
    
    console.log(this.consultant);
    this.consultantService.update(this.consultant).subscribe(result=>{
      this.dataStorageService.consultant = result;
      this.router.navigate([`detail/${result.id}`]);
     });    
  }
  
  empty(item) {    
    item.controls.consultantCompetence.reset();
    item.value.consultantCompetence = new InformaticCompetence();  
    item.controls.consultantCompetence = this.newConsultantCompetence();
  }


  addCompetence(group){
    group.controls.items.push(this.newCompetenceItem());
  }

}
