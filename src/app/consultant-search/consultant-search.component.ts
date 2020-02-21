import { Component, OnInit, SkipSelf, ViewChild, TemplateRef } from '@angular/core';
import { ConsultantProfileComponent } from '../consultant-profile/consultant-profile.component';
import { Consultant, CompetenceItem } from '../classes';
import { ConsultantService } from '../services/consultant.service';
import {  Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder, ControlContainer } from '@angular/forms';
import { DataStorageService } from '../services/data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../reusable-components/confirmation-dialog.component';

@Component({
  selector: 'app-consultant-search',
  templateUrl: './consultant-search.component.html'
})
export class ConsultantSearchComponent implements OnInit {

  consultants: Consultant[];
  itemToDelete: Consultant;
  showList: boolean;
  showSearch : boolean;
  staticHeader=[
    {property: 'lastname', placeholder: 'Nom'},
    {property: 'firstname', placeholder: 'Prénom'}
  ];
  headerToShow: {property: string, placeholder: string}[] = [];

  selectSearchForm: FormGroup;
  researchCriteriaOptions=[
    { "property":"firstname", "description" : "Prénom"},
    { "property":"lastname", "description" : "Nom"},
    { "property":"title", "description" : "Métier"},
    { "property":"profile", "description" : "Profile"},
    { "property":"occupancy", "description" : "Temps"},
    { "property":"mobility", "description" : "Mobilité"},
    { "property":"interests", "description" : "Intérêts"},
  ]

  buttonsArray = [
    {type: 'view', placeholder: 'Imprimer', class: 'btn btn-info', iconClass: 'fas fa-eye'},
    {type: 'edit', placeholder: 'Corriger', class: 'btn btn-success', iconClass: 'fas fa-edit'},
    {type: 'delete', placeholder: 'Supprimer', class: 'btn btn-danger', iconClass: 'fas fa-trash-alt'}
  ];

  competenceChoice: FormGroup;
  competenceItems: Array<CompetenceItem>;
  @ViewChild('deleteDialogTemplate', {static: false})
  deleteDialogTemplate: TemplateRef<any>;

  constructor
  (
    private consultantService: ConsultantService, 
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataStorageService: DataStorageService,
    private dialog: MatDialog
  ) 
  {
      this.router.routeReuseStrategy.shouldReuseRoute = function() 
      {
        return false;
      };
  }

  ngOnInit() {
    let on: boolean = !!this.route.snapshot.url.length;
    this.showSearch = on;
    this.showList = !on;
    this.headerToShow = [...this.staticHeader];

    this.selectSearchForm = this.fb.group({
      selectFormControl: ['', Validators.required],
      searchString: ['', Validators.required]
    });
    this.competenceChoice =  this.fb.group({id: 0, description: ""});
    this.dataStorageService.getCompetenceItems().subscribe(
      result => 
      {
        this.competenceItems = result;
      },
      error => console.log(error),
      () =>
      {
        this.consultantService.getAll().subscribe(
          results => 
          {
            this.consultants = results;
          },
          error => console.log(error));
      }
      );    
  }

  onSubmitCriteria() : void{
    let formValue = this.selectSearchForm.value;
    let newFields = [];
    if(formValue.selectFormControl!='lastname' && formValue.selectFormControl!='firstname'){
      newFields.push({property: formValue.selectFormControl, placeholder: formValue.selectFormControl});
    }
    this.changeFieldsToShow(newFields);
    this.consultantService.searchBySubstring(formValue.selectFormControl, formValue.searchString).subscribe(
      result => 
      {
        this.consultants = result
      },
      err => 
      {
        console.log(err)
      },
      () =>
      {
         this.showList=true;
      }
        );
    this.showList=true;
  }

  onSubmitCompetenceChoice(): void{    
    let newFields = this.dataStorageService.competenceHeader;
    this.changeFieldsToShow(newFields);
    let description = this.competenceChoice.value.description;
    this.consultantService.searchByCompetences(description).subscribe(
      result => 
      {
        this.consultants = result;
        this.consultants.forEach(consultant =>{  
          let competence = consultant.competences.filter(
            competence => competence.parent2.description==description); 
            Object.keys(competence[0]).forEach(key =>
              {
                if(key!='id'){
                consultant[key] = competence[0][key];
              }
              });        
        })
      },
      err => {console.log(err);},
      () =>  {this.showList=true;}
      );  
  }

  changeFieldsToShow(newFields: {property: string, placeholder: string}[])
  {
    this.headerToShow = [...this.staticHeader];
    newFields.forEach(field =>
      {
        this.headerToShow.push(field);
      }
    );
  }

  buttonFunction(event){
    let id = this.consultants[event.line_number].id;
    if(event.button_number == 0){
      this.router.navigate([`detail/${id}`]);  
    }
    else{
      if(event.button_number==1){
        this.router.navigate([`edit/${id}`]);  
      }
      else{
        if(event.button_number==2){
          this.openDialog(this.consultants[event.line_number]);
        }
      }
    }
  }

  delete(consultant: Consultant){
    this.consultants = this.consultants.filter(h => h !== consultant);
    this.consultantService.delete(consultant.id).subscribe();
  }

  openDialog(consultant: Consultant) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        item: consultant.firstname.concat(" ",consultant.lastname), 
        headerText: "Vous voulez supprimer le consultant ",
        template: this.deleteDialogTemplate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.delete(consultant);
      }
    });
}

}
