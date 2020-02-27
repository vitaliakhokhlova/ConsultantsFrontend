import { Component, OnInit, Input, SkipSelf } from '@angular/core';
import { Consultant, Force, ForceItem } from '../../classes';
import { FormGroup, FormArray, ControlContainer } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-consultant-forces',
  templateUrl: './consultant-forces.component.html',
  styleUrls: ['./consultant-forces.component.css'],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
}]
})
export class ConsultantForcesComponent implements OnInit {

  @Input() consultant: Consultant;
  parentForm: FormGroup;
  forces_loaded = false;
  forceItems = new FormArray([]);
  indexes = [];

  constructor(
    private parentFormControlContainer: ControlContainer,
    private fb: RxFormBuilder,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.parentForm = this.parentFormControlContainer.control as FormGroup;
    this.consultant.forces.forEach(x =>
      {
        this.forces.push(this.fb.group(x));
        this.indexes.push(x.parent2.id);
      });
    this.dataStorageService.getForces().subscribe(
      forces =>
      {
        forces = forces.filter(x => this.indexes.indexOf(x.id)==-1);
        forces.forEach(force =>
          (<FormArray>this.forceItems).push(this.fb.group(
            {
              position: 0,
              parent2: force
            }
            )))
      },
      err => {
        console.log(err);
      });
  }

  get forces() {
    return this.parentForm.get('forces') as FormArray;
  }

  addForcesToForm(forces) {
    let i = 1;
    this.forces_loaded = true;
    for(let item of forces){
      let force = new Force();
      force.position = i;
      force.parent2 = new ForceItem();
      force.parent2.id = item.id;
      force.parent2.description = item.description;
      this.forces.push(this.fb.group(force));
      i=i+1;
    }
    this.forces_loaded = true;
  }


}
