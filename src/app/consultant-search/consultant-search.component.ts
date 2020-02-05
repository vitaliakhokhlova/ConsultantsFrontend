import { Component, OnInit } from '@angular/core';
import { ConsultantdetailComponent } from '../consultantdetail/consultantdetail.component';
import { Consultant } from '../classes';
import { ConsultantService } from '../services/consultant.service';
import {  Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultant-search',
  templateUrl: './consultant-search.component.html',
  styleUrls: ['./consultant-search.component.css']
})
export class ConsultantSearchComponent implements OnInit {

  items: Consultant[];
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

  constructor(private consultantService: ConsultantService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.consultantService.getAll().subscribe(results => this.items = results);
  }

  onSubmit() : void{
    this.selectFormControl.reset();
    this.consultantService.searchBySubstring(this.property, this.searchString).subscribe(
      result => this.items = result);
  }

  selectedOption(option: any){
    this.property = option.property;
    this.keysToShow.pop();
    this.headElements.pop();
    this.keysToShow.push(option.property);
    this.headElements.push(option.description);
  }

  delete(consultant: Consultant){
    console.log(consultant);
    this.items = this.items.filter(h => h !== consultant);
    this.consultantService.delete(consultant.id).subscribe();
  }
}
