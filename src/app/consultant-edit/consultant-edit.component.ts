import { Component, OnInit } from '@angular/core';
import { Consultant, Competence, HistoryObject } from '../classes';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsultantService} from '../services/consultant.service';
import { DataStorageService } from "../services/data-storage.service";

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
    private dataService: DataStorageService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getConsultant(id); 
    console.log(this.consultant);
  }

  getConsultant(id: number): void {  
    if(id == 0){
      console.log("creating new consultant");
      this.consultant = new Consultant();
    }
    else
    {
        this.consultantService.read(id).subscribe(results => 
          {
            this.consultant = results; 
            console.log("retrieving consultant from database");
            console.log(this.consultant);
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
