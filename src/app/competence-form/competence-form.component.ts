import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GroupService} from '../services/group.service';
import { Consultant, InformaticCompetence } from '../classes';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ConsultantService } from '../services/consultant.service';
import { DataStorageService } from '../services/data-storage.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../reusable-components/confirmation-dialog.component';

@Component({
  selector: 'app-competence-form',
  templateUrl: './competence-form.component.html'
})
export class CompetenceFormComponent implements OnInit {

  headerToShow: {property: string, placeholder: string}[] = [];
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
    this.headerToShow = this.dataStorageService.competenceHeader;
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
        for (let group of groups){
          let newGroup = this.newGroup();
          newGroup.patchValue(group);
          let sortedItems = [];
          //sortedItems = this.sortArrayOfObjects(group.items, 'description');
          sortedItems = group.items; //already sorted on backend
          for (let item of sortedItems)
          {
            let newItem = this.newCompetenceItem();
            newItem.patchValue(item);
            for(let consultantCompetence of comp)
              {
                if(consultantCompetence.parent2.id==item.id)
                {
                  newItem.controls.consultantCompetence.patchValue(consultantCompetence);
                  comp = comp.filter(x => x !== consultantCompetence);
                  break;
                }
              }
            (<FormArray>newGroup.get('items')).push(newItem);
          }
          this.groups.push(newGroup);
        }
      },
      err =>
      {
        console.log(err);
      },
      () =>
      {
        this.show = true;
      }
    );
  }

  sortArrayOfObjects(array: any[], property: string){
    let sortedArray = array.sort((object1,object2)=>
    {
      if(object1[property]>object2[property]) return 1;
      if(object1[property]<object2[property]) return -1;
      return 0;
    });
    return sortedArray;
  }

  onSubmit(isEnd: boolean){
    this.consultant.competences = [];
    this.groups.value.forEach(
      group =>
      {
        group.items.forEach(
          item =>
          {
            if(item.consultantCompetence.niveau!=0)
            {
              item.consultantCompetence.parent = {id: this.idConsultant};
              item.consultantCompetence.parent2={
              id: item.id,
              description: item.description,
              parent2: {id: group.id}};
              console.log(item.consultantCompetence);
              this.consultant.competences.push(item.consultantCompetence);
            }
          }
        )
      }
    );
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

  addCompetence(i: number){
    this.onSubmit(false);
    this.openDialog(i);
  }

  openDialog(i: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '700px',
      data: {
        item:  this.groups.controls[i].value.description,
        headerText: "Entrez le nom de la nouvelle compétence informatique dans le groupe ",
        template: this.newCompetenceDialogTemplate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.updateGroup(i);
      }
    });
  }

  updateGroup(i: number){
    let group = this.groups.controls[i].value;
    for(let item of group.items){
      delete item.consultantCompetence;
    }
    group.items.push({
      id:0,
      description: this.newCompetence
    });

    this.groupService.update(group).subscribe(
      result => {},
      err => console.log(err),
      () =>  this.ngOnInit()
    );

  }

}
