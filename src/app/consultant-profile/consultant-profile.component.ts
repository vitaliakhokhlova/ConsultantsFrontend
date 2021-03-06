import { Component, OnInit, Input } from '@angular/core';
import { Consultant, CompetenceGroup, CompetenceItem } from '../classes';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-consultant-profile',
  templateUrl: './consultant-profile.component.html',
  styleUrls: ['./consultant-profile.component.css']
})

export class ConsultantProfileComponent implements OnInit {

  consultant: Consultant;
  age: number;
  groups: Array<CompetenceGroup>;
  photoname: any;
  pictrogram: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataStorageService.getConsultant(id)
    .subscribe(result=>
      {
        this.consultant=result;
        this.calculateAge(result);
        this.makeCompetenceGroups(result);
      });
  }

  calculateAge(consultant: Consultant){
    let ms = new Date().valueOf() - new Date(consultant.birthday).valueOf();
    this.age =Math.floor((ms / (1000 * 3600 * 24))/365.25);;
  }

  makeCompetenceGroups(consultant: Consultant){
    this.groups = new Array<CompetenceGroup>();
    if(consultant.competences){
      for(let competence of consultant.competences){
        let newGroup = new CompetenceGroup();
        let parent = competence.parent2.parent2;
        if(typeof parent === 'number')
        {
          newGroup.id=parent;
        }
        else{
          newGroup.id=parent.deep_id;
          newGroup.description = parent.description;
        }
        let existingGroup = this.groups.filter(x => x.id == newGroup.id)[0];
        if(existingGroup){
          existingGroup.items.push({description: competence.parent2.description});
          if(!existingGroup.description && newGroup.description){
            existingGroup.description = newGroup.description;
          }
        }
        else{
          newGroup.items = new Array<CompetenceItem>();
          newGroup.items.push({description: competence.parent2.description});
          this.groups.push(newGroup);
        }
      }
    }
  }

  goTo(route: string){
    this.router.navigate([route]);
  }

  onPrint(){
    window.print();
}
}
