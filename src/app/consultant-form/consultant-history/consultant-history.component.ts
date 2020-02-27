import { Component, OnInit, SkipSelf, Input } from '@angular/core';
import { ControlContainer, FormArray, FormGroup } from '@angular/forms';
import { HistoryObjectWithChildren, HistoryObject, ResourceWithDescription, Consultant } from '../../classes';
import { RxFormGroup, RxFormBuilder } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-consultant-history',
  templateUrl: './consultant-history.component.html',
  styleUrls: ['./consultant-history.component.css'],
  viewProviders: [{
          provide: ControlContainer,
          useFactory: (container: ControlContainer) => container,
          deps: [[new SkipSelf(), ControlContainer]],
  }]
})
export class ConsultantHistoryComponent implements OnInit {

  @Input() consultant: Consultant;
  historyArraysNames = ['formations', 'projets', 'parcours'];
  isWithChildren = [false, true, true];
  historyObjectFields=[
    {property: 'description', placeholder:'Description' },
    {property: 'institution', placeholder: 'Organisation'},
    {property: 'place', placeholder: 'Ville'},
    {property: 'dates', placeholder: 'Dates'}
  ];
  parentForm: FormGroup;

  constructor(
    private parentFormControlContainer: ControlContainer,
    private fb: RxFormBuilder
    ) {

  }

  ngOnInit() {
    this.parentForm = this.parentFormControlContainer.control as FormGroup;
    for (var i: number = 0; i < this.historyArraysNames.length; i++){
      this.consultant[this.historyArraysNames[i]].forEach(
        x => {
          if(this.isWithChildren[i]){
            if(!x.details.length)
            {
              x.details.push(new ResourceWithDescription());
            }
          }
          (<FormArray>this.parentForm.get(this.historyArraysNames[i])).push(this.fb.group(x));
        });
    }
  }

  addHistoryObjectWithChildren(arrayName: string, isWithDetails: boolean){
    console.log(this.parentForm);
    let array = this.parentForm.get(arrayName) as FormArray;
    if(isWithDetails){
      array.push(this.fb.formGroup(new HistoryObjectWithChildren()) as RxFormGroup);
    }
    else{
      array.push(this.fb.formGroup(new HistoryObject()) as RxFormGroup);
    }
  }

  addDetail(item){
    const control = item.get('details');
    control.push(this.fb.formGroup(new ResourceWithDescription()) as RxFormGroup);
  }

}
