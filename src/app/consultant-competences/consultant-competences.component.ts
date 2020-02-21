import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultant } from '../classes';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-consultant-competences',
  templateUrl: './consultant-competences.component.html'
})
export class ConsultantCompetencesComponent implements OnInit {

  idConsultant: number;
  consultant: Consultant;
  headerToShow: {property: string, placeholder: string}[] = [];

  constructor(
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.idConsultant = +this.route.snapshot.paramMap.get('id');
    this.headerToShow.push({property: 'parent2.description', placeholder: 'Compétence'});
    this.dataStorageService.competenceHeader.forEach(header =>
      {
        this.headerToShow.push(header);
      })
    this.dataStorageService.getConsultant(this.idConsultant)
    .subscribe(result=>
      {
        this.consultant=result;    
      });
  }

}
