import { Component, OnInit } from '@angular/core';
import { Consultant } from '../classes';
import { ActivatedRoute } from '@angular/router';
import { ConsultantService} from '../services/consultant.service';

@Component({
  selector: 'app-consultant-edit',
  templateUrl: './consultant-edit.component.html',
  styleUrls: ['./consultant-edit.component.css']
})
export class ConsultantEditComponent implements OnInit {

  consultant: Consultant;

  constructor(
    private route: ActivatedRoute,
    private consultantService: ConsultantService
  ) { }

  ngOnInit() {
    this.getConsultant();
  }

  getConsultant(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id === 0){
      this.consultant = new Consultant();
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
     this.consultantService.create(this.consultant).subscribe(result=>this.consultant=result);
    }
    else{
      console.log("saving consultant");
       this.consultantService.update(this.consultant).subscribe(result=>this.consultant=result);
    }
   }

}
