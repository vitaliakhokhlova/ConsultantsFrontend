import { Component, OnInit } from '@angular/core';
import { ConsultantdetailComponent } from '../consultantdetail/consultantdetail.component';
import { Consultant } from '../classes';
import { ConsultantService } from '../services/consultant.service';

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
            "description" : "Profil"},
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
  constructor(private consultantService: ConsultantService) { }

  ngOnInit() {
    this.getAll();
  }

    getAll(){
    this.consultantService.getAll().subscribe(results => this.items = results);
  }

  onSubmit() : void{
    this.consultantService.searchBySubstring(this.property, this.searchString).subscribe(
      result => this.items = result);
  }

  selectedOption(option: any){
    this.property = option.property;
  }

  delete(consultant: Consultant){
    console.log(consultant);
    this.items = this.items.filter(h => h !== consultant);
    this.consultantService.delete(consultant.id).subscribe();
  }

}
