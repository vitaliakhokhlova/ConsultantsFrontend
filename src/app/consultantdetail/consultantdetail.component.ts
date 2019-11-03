import { Component, OnInit, Input } from '@angular/core';
import { Consultant } from '../classes';
import { ActivatedRoute } from '@angular/router';
import { ConsultantService} from '../services/consultant.service';

@Component({
  selector: 'app-consultantdetail',
  templateUrl: './consultantdetail.component.html',
  styleUrls: ['./consultantdetail.component.css']
})

export class ConsultantdetailComponent implements OnInit {

  consultant: Consultant;
  age: number;

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
          this.calculateAge();
        }
      );
    }
  }
  
  calculateAge(){
    this.age = new Date().getFullYear() - new Date(this.consultant.birthday).getFullYear();	  
  }
}
