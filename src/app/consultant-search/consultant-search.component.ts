import { Component, OnInit } from '@angular/core';
import { ConsultantdetailComponent } from '../consultantdetail/consultantdetail.component';
import { Consultant, CompetenceItem } from '../classes';
import { ConsultantService } from '../services/consultant.service';
import {  Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-consultant-search',
  templateUrl: './consultant-search.component.html',
  styleUrls: ['./consultant-search.component.css']
})
export class ConsultantSearchComponent implements OnInit {

  consultants: Consultant[];
  searchString: string;
  keysToShow=["firstname", "lastname", "title"];
  headElements=['ID', 'Prénom', 'Nom','Métier'];
  itemToDelete;
  selectFormControl = new FormControl('', Validators.required);
  property: string;
  options=[
    {
      "property":"firstname",
      "description" : "Prénom"},
      {
        "property":"lastname",
        "description" : "Nom"},
        {
          "property":"title",
          "description" : "Métier"},
          {
            "property":"profile",
            "description" : "Profile"},
            {
              "property":"occupancy",
              "description" : "Temps"},
              {
                "property":"mobility",
                "description" : "Mobilité"},
                {
                  "property":"interests",
                  "description" : "Intérêts"},
  ]

  competenceChoice: FormGroup;
  competenceItems: Array<CompetenceItem>;
  allLoaded: boolean;

  constructor
  (
    private consultantService: ConsultantService, 
    private router: Router,
    private fb: FormBuilder,
    private dataStorageService: DataStorageService
  ) 
  {
      this.router.routeReuseStrategy.shouldReuseRoute = function() 
      {
        return false;
      };
  }

  ngOnInit() {
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
          error => console.log(error),
          () => this.allLoaded = true);
      }
      );
    
  }

  onSubmit() : void{
    this.selectFormControl.reset();
    this.consultantService.searchBySubstring(this.property, this.searchString).subscribe(
      result => this.consultants = result);
  }

  onSubmitCompetenceChoice(): void{
    let description =this.competenceChoice.value.description;
    console.log(description);
    let newFields = [
      {property: "niveau", description: "Niveau"},
      {property: "experience", description: "Expérience, ans"},
      {property: "annee", description: "Dernière utilisation, année"},
      {property: "contexte", description: "Contexte"},
      {property: "interet", description: "Intérêt"}
    ];
    this.changeFieldsToShow(newFields);
    this.consultantService.searchByCompetences(description).subscribe(
      result => 
      {
        this.consultants = result;
        this.consultants.forEach(consultant =>{      
          let competence = consultant.competences.filter(
            competence => competence.parent2.description==description);  
            console.log(competence[0].parent2);  
            newFields.forEach(field =>
              {
                consultant[field.property] = competence[0][field.property];
              });          
        })
      });
      console.log(this.consultants)
      this.selectFormControl.reset();
  }

  changeFieldsToShow(newFields: {property: string, description: string}[])
  {
    this.keysToShow.pop();
    this.headElements.pop();
    newFields.forEach(field =>
      {
        this.keysToShow.push(field.property);
        this.headElements.push(field.description);
      }
    );
  }

  selectedOption(option: any){
    this.property = option.property;
    this.changeFieldsToShow([option]);
  }

  delete(consultant: Consultant){
    console.log(consultant);
    this.consultants = this.consultants.filter(h => h !== consultant);
    this.consultantService.delete(consultant.id).subscribe();
  }
}
