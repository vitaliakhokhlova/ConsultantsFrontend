import { Component, OnInit, SkipSelf, ViewChild, TemplateRef } from '@angular/core';
import { ConsultantdetailComponent } from '../consultantdetail/consultantdetail.component';
import { Consultant, CompetenceItem } from '../classes';
import { ConsultantService } from '../services/consultant.service';
import {  Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, ControlContainer } from '@angular/forms';
import { DataStorageService } from '../services/data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-consultant-search',
  templateUrl: './consultant-search.component.html',
  styleUrls: ['./consultant-search.component.css']
})
export class ConsultantSearchComponent implements OnInit {

  consultants: Consultant[];
  itemToDelete: Consultant;
  keysToShow: string[];
  headElements: string[];
  selectSearchForm: FormGroup;
  options=[
    { "property":"firstname", "description" : "Prénom"},
    { "property":"lastname", "description" : "Nom"},
    { "property":"title", "description" : "Métier"},
    { "property":"profile", "description" : "Profile"},
    { "property":"occupancy", "description" : "Temps"},
    { "property":"mobility", "description" : "Mobilité"},
    { "property":"interests", "description" : "Intérêts"},
  ]

  competenceChoice: FormGroup;
  competenceItems: Array<CompetenceItem>;
  @ViewChild('deleteDialogTemplate', {static: false})
  deleteDialogTemplate: TemplateRef<any>;

  constructor
  (
    private consultantService: ConsultantService, 
    private router: Router,
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
    this.keysToShow=["lastname", "firstname", "title"];
    this.headElements = ['Nom', 'Prénom','Métier'];
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
    let newFields = [
      {property: "lastname", description: "Nom"},
      {property: "firstname", description: "Prénom"}
    ];
    if(formValue.selectFormControl!='lastname' && formValue.selectFormControl!='firstname'){
      newFields.push(  {property: formValue.selectFormControl, description: formValue.selectFormControl});
    }
    this.changeFieldsToShow(newFields);
    this.consultantService.searchBySubstring(formValue.selectFormControl, formValue.searchString).subscribe(
      result => this.consultants = result);
  }

  onSubmitCompetenceChoice(): void{    
    let newFields = [
      {property: "lastname", description: "Nom"},
      {property: "firstname", description: "Prénom"},
      {property: "niveau", description: "Niveau"},
      {property: "experience", description: "Expérience"},
      {property: "annee", description: "Dernière utilisation"},
      {property: "contexte", description: "Contexte"},
      {property: "interet", description: "Intérêt"}
    ];
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
      });
  }

  changeFieldsToShow(newFields: {property: string, description: string}[])
  {
    this.keysToShow = [];
    this.headElements = [];
    newFields.forEach(field =>
      {
        this.keysToShow.push(field.property);
        this.headElements.push(field.description);
      }
    );
  }

  delete(consultant: Consultant){
    console.log(consultant);
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
