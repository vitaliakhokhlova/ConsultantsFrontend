import { Component, OnInit, SkipSelf, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Consultant } from '../../classes';
import { RxFormGroup, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-consultant-header',
  templateUrl: './consultant-header.component.html',
  styleUrls: ['./consultant-header.component.css'],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
}]
})
export class ConsultantHeaderComponent implements OnInit {

  @Input() consultant: Consultant;
  parentForm: RxFormGroup;

  simpleInputs=[
    [
      {name: 'firstname', placeholder: 'Prénom'},
      {name: 'lastname', placeholder: 'Nom'},
      {name: 'title', placeholder: 'Métier'}
    ],
    [
      {name: 'expression', placeholder: 'Citation'},
      {name: 'author', placeholder: 'Auteur de la citation'}
    ],
    [{name: 'interests', placeholder: 'Intérêts'}]
  ];

  startDate = new Date(1990, 0, 1);

  constructor(
    private parentFormControlContainer: ControlContainer
  ) { }

  ngOnInit() {
    this.parentForm = this.parentFormControlContainer.control as RxFormGroup;
    this.parentForm.patchValue({birthday: new Date(this.consultant.birthday)});
  }

  onFileChange(event){
    if(event.target.files && event.target.files.length) {
      let file =  event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.parentForm.get('userpic').setValue(reader.result);
        this.parentForm.get('userpic').updateValueAndValidity();
      }
    }
  }

}
