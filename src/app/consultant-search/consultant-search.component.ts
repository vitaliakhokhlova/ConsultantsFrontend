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

  consultants: Consultant[];
  searchString: string;

  constructor(private consultantService: ConsultantService) { }

  ngOnInit() {
  }

  submit(): void{
    this.consultantService.searchBySubstring("title",this.searchString).subscribe(
      result => this.consultants = result);
  }

}
