import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GroupService} from '../services/group.service';
import { Consultant, InformaticCompetence, CompetenceGroup, CompetenceItem } from '../classes';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ConsultantService } from '../services/consultant.service';
import { CompetenceService } from '../services/competence.service';
import { DataStorageService } from '../services/data-storage.service';
import { CompetenceItemService } from '../services/competence-item.service';
import { Observable, forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
  @ViewChild('newCompetenceDialogTemplate', {static: false})
  newCompetenceDialogTemplate: TemplateRef<any>;
  newCompetence: string;

  constructor(
    private dataStorageService: DataStorageService,
    private consultantService: ConsultantService,
    private competenceItemService: CompetenceItemService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
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

  onSubmit(isEnd: boolean){
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
      if(isEnd){
      this.router.navigate([`detail/${result.id}`]);
    }
     });    
  }
  
  empty(item) {    
    item.controls.consultantCompetence.reset();
    item.value.consultantCompetence = new InformaticCompetence();  
    item.controls.consultantCompetence = this.newConsultantCompetence();
  }


  addCompetence(group: CompetenceGroup, i: number){
    this.onSubmit(false);
    this.openDialog(group, i);
  }

  openDialog(group: CompetenceGroup, i: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '700px',
      data: {
        item: group.description, 
        headerText: "Entrez le nom de la nouvelle compétence informatique dans le groupe ",
        template: this.newCompetenceDialogTemplate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // let newCompetence = {
        //   description: this.newCompetence,
        //   parent2: {id: group.id}
        // };
        let updatedGroup={
          id: this.groups.controls[i].value.id,
          description: this.groups.controls[i].value.description,
          items: []
        };
        for(let item of this.groups.controls[i].value.items){
          updatedGroup.items.push({
            id: item.id, 
            description: item.description,
            parent2: {id: updatedGroup.id, description: updatedGroup.description}});
        }
        updatedGroup.items.push({
          id:0,
          description: this.newCompetence,
          parent2: {id: updatedGroup.id}
        });
        this.groupService.update(updatedGroup).subscribe();
        this.ngOnInit();
        // this.competenceItemService.create(newCompetence).subscribe(
        //   serverResponse =>
        //   {
        //     let newItem =this.newCompetenceItem();
        //     newItem.patchValue({
        //       id: serverResponse.id,
        //       description: serverResponse.description
        //     });
        //     (<FormArray>this.groups.controls[i].get('items')).push(newItem);
        //   }
        // );
      }
    });
  }

}
