import { Component, OnInit, SkipSelf, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { RxFormBuilder, RxFormGroup, RxFormArray } from '@rxweb/reactive-form-validators';
import { DataStorageService } from '../../services/data-storage.service';
import { LangueItem, Consultant, Langue } from '../../classes';
import { LangueService } from '../../services/langue.service';

@Component({
  selector: 'app-consultant-langues',
  templateUrl: './consultant-langues.component.html',
  styleUrls: ['./consultant-langues.component.css'],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
}]
})
export class ConsultantLanguesComponent implements OnInit {

  @Input() consultant: Consultant;
  parentForm: RxFormGroup;
  langueItems: Array<LangueItem>;

  constructor(
    private parentFormControlContainer: ControlContainer,
    private fb: RxFormBuilder,
    private dataStorageService: DataStorageService,
    private langueService: LangueService
  ) {

   }

  ngOnInit() {
    this.parentForm = this.parentFormControlContainer.control as RxFormGroup;
    this.consultant.langues.forEach(x =>
      {
        let langue = this.fb.formGroup(new Langue());
        langue.patchValue(x);
        this.langues.push(langue);
      }
    );
    this.dataStorageService.getLangues().subscribe(
      langues =>
      {
        this.langueItems=langues;
      },
      err =>
      {
        console.log(err);
      },
      () =>
      {

      });
  }

  get langues(){
    return <RxFormArray>this.parentForm.get('langues');
  }

  addLangue() {
    this.langues.push(this.fb.formGroup(new Langue()));
  }

  createNewLanguage(langueConsultant){
    let item = new LangueItem();
    item.description = langueConsultant.value.parent2.description;
    this.langueService.update(item).subscribe(result => {
      langueConsultant.controls['parent2'].patchValue({"id": result.id, "description": result.description});
    });
  }


  delete(i: number) {
    this.langues.removeAt(i);
  }

}
