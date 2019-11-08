import { Component, OnInit } from '@angular/core';
import { Consultant, Competence, HistoryObject } from '../classes';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConsultantService} from '../services/consultant.service';
import { HistoryEditComponent } from '../history-edit/history-edit.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-consultant-edit',
  templateUrl: './consultant-edit.component.html',
  styleUrls: ['./consultant-edit.component.css'],

})
export class ConsultantEditComponent implements OnInit {

  consultant: Consultant;
  input : Array<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultantService: ConsultantService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = +this.route.params.subscribe(result=>{
      this.getConsultant(result.id);
    });
  }

  getConsultant(id: number): void {    
    if(id == 0){
      this.consultant = new Consultant();
      console.log(this.consultant.id);
    }
    else{
      this.consultantService.read(id).subscribe(results => 
        {
          this.consultant = results; 
        }
      );
    }
  }
  save(): void {
    if(this.consultant.id === undefined)
    {
      console.log("consultant-edit component adding consultant");
      this.consultantService.create(this.consultant).subscribe(result=>{
      this.consultant=result;
      this.printConsultant();
     });
    }
    else{
      console.log("saving consultant");
       this.consultantService.update(this.consultant).subscribe(result=>{
        this.consultant=result;
        this.printConsultant();
       });
    }
   }

   printConsultant() {
      this.router.navigate([`detail/${this.consultant.id}`]);
      //this.location.go(`detail/${this.consultant.id}`);
   }

   setCompetence(competences: Array<Competence>): void{
    this.consultant.competences = competences;
  }
}
