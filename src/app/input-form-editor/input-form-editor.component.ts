import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ConsultantService} from '../services/consultant.service';
import { DataStorageService } from "../services/data-storage.service";
import { Consultant, HistoryObject, HistoryObjectWithChildren, Factory, ResourceWithDescription } from '../classes';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { RxFormBuilder, RxFormGroup, RxFormArray } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-input-form-editor',
  templateUrl: './input-form-editor.component.html',
  styleUrls: ['./input-form-editor.component.css'],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
],
})
export class InputFormEditorComponent implements OnInit {

  consultantForm: RxFormGroup;
  consultant: Observable<Consultant>;
  startDate = new Date(1990, 0, 1);

  constructor(
    private _adapter: DateAdapter<any>,
    private route: ActivatedRoute,
    private router: Router,
    private fb: RxFormBuilder,
    private consultantService: ConsultantService,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this._adapter.setLocale('fr');

    this.createForm();

    const id = +this.route.snapshot.paramMap.get('id');
    this.consultant = this.dataStorageService.getConsultant(id).pipe(
      tap(response => this.patchForm(response)));    
    console.log(this.consultant);
  }

  createForm(){
    let consultant = new Consultant();
    this.consultantForm = this.fb.formGroup(consultant) as RxFormGroup;
    console.log("Form created");
    console.log(this.consultantForm);
   
    // this.consultantForm = this.fb.group({
    //   id: [0],
    //   firstname: ['', Validators.required],
    //   lastname: ['', Validators.required],
    //   title: ['', Validators.required],
    //   birthday: [''],
    //   expression: [''],
    //   author: [''],
    //   mobility: [''],
    //   occupancy: [''],
    //   photoname: [''],
    //   interests: [''],
    //   profile: [''],
    //   formations: this.fb.array([]),
    //   forces: this.fb.array([]),
    //   parcours: this.fb.array([]),
    //   projets: this.fb.array([]),
    //   langues: this.fb.array([this.createCompetence()]),
    //   competences: this.fb.array([this.createCompetence()])
    // });
  }

  patchForm(data){
    this.consultantForm.patchValue(data);
    console.log("Form patched from data");
    console.log(this.consultantForm);

    this.consultantForm.patchValue({birthday: new Date(data.birthday)});

    data.formations.forEach(x => this.formations.push(this.fb.group(x)));
    data.parcours.forEach(x => this.parcours.push(this.fb.group(x)));
    data.projets.forEach(x => {
     //--3 x.details.push(new ResourceWithDescription());
      this.projets.push(this.fb.group(x));
    });23
            
    console.log("Patching arrays");
    console.log(this.consultantForm);
  }

  get formations(): FormArray {
    return this.consultantForm.get('formations') as RxFormArray;
  }

  addFormation() {
    this.formations.push(<RxFormGroup>this.fb.formGroup(new HistoryObject()));
    console.log(this.consultantForm);
  }

  get forces() {
    return this.consultantForm.get('forces') as FormArray;
  }
  
  get parcours() {
    return this.consultantForm.get('parcours') as RxFormArray;
  }

  addParcours(){
    let parcour = new HistoryObjectWithChildren();
    parcour.details = new Array<HistoryObjectWithChildren>();
    parcour.details.push(new ResourceWithDescription());
    this.parcours.push(this.fb.group(parcour));
  }

  get projets() {
    return this.consultantForm.get('projets') as RxFormArray;
  }

  addProject(){
    this.projets.push(this.fb.formGroup(new HistoryObjectWithChildren()) as RxFormGroup);
    console.log(this.consultantForm);
  }

  addDetail(item){
    const control = item.get('details');
    control.push(this.fb.formGroup(new ResourceWithDescription()) as RxFormGroup);
    console.log(this.consultantForm);
  }

  get competences() {
    return this.consultantForm.get('competences') as FormArray;
  }

  delete(array, i) {
    array.removeAt(i);
  }

  onSubmit() {
    if (this.consultantForm.valid) {
      console.log(this.consultantForm.value);
      this.consultantService.update(this.consultantForm.value).subscribe(result=>{
        console.log("Consultant: "+result);
        this.dataStorageService.consultant = result;
        this.router.navigate([`detail/${result.id}`]);
       });
    }
  }

}
