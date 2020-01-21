import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ConsultantService} from '../services/consultant.service';
import { DataStorageService } from "../services/data-storage.service";
import { Consultant, HistoryObject, HistoryObjectWithChildren, Factory, ResourceWithDescription, Force, ForceItem } from '../classes';
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
import { ForceService } from '../services/force.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

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
  forces_loaded = false;

  constructor(
    private _adapter: DateAdapter<any>,
    private route: ActivatedRoute,
    private router: Router,
    private fb: RxFormBuilder,
    private dataStorageService: DataStorageService,
    private consultantService: ConsultantService,
    private forceService: ForceService) { }

  ngOnInit() {
    this._adapter.setLocale('fr');    
    const id = +this.route.snapshot.paramMap.get('id');
    this.forceService.getAll().subscribe(
      forces => 
      { 
        this.createForm(forces);
      },
      err => {
          console.log(err);
      },
      () => {
        this.patchForm(id); 
      });
  }

  createForm(forces){
    this.consultantForm = this.fb.formGroup(new Consultant()) as RxFormGroup;
    this.addForcesToForm(forces);
   
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

  patchForm(id){
    this.consultant = this.dataStorageService.getConsultant(id).pipe(
      tap(data => 
        {
        if(data.forces.length > 0){
          console.log("Test");
          console.log(this.forces.length);
          for(let i = this.forces.length-1; i >= 0; i--) {
            console.log("Deleting force");
            this.forces.removeAt(i);
          }            
        }
        this.consultantForm.patchValue(data);
        this.consultantForm.patchValue({birthday: new Date(data.birthday)});
        data.formations.forEach(x => this.formations.push(this.fb.group(x)));    
        data.forces.forEach(x => this.forces.push(this.fb.group(x)));
        data.projets.forEach(x => {
          //x.details.push(new ResourceWithDescription());     
          this.projets.push(this.fb.group(x));
        });
        data.parcours.forEach(x => {
          //x.details.push(new ResourceWithDescription());
          this.parcours.push(this.fb.group(x));
        });             
      }
      )
    ); 
  }

  get formations(): FormArray {
    return this.consultantForm.get('formations') as RxFormArray;
  }

  addFormation() {
    this.formations.push(<RxFormGroup>this.fb.formGroup(new HistoryObject()));
    console.log(this.consultantForm);
  }

  addForcesToForm(forces) {
    if(this.forces.length==0){
      console.log("Force length before inserting");
      console.log(this.forces.length);
            
      let i = 1;
      console.log("Force length before inserting");
      console.log(this.forces.length);
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
      console.log("Force length after inserting");
      console.log(this.forces.length);
      this.forces_loaded = true;
    }
  }

  get forces() {
    return this.consultantForm.get('forces') as FormArray;
  }
  
  get parcours() {
    return this.consultantForm.get('parcours') as RxFormArray;
  }

  addParcours(){
    this.parcours.push(this.fb.formGroup(new HistoryObjectWithChildren()) as RxFormGroup);
  }

  get projets() {
    return this.consultantForm.get('projets') as RxFormArray;
  }

  addProject(){
    this.projets.push(this.fb.formGroup(new HistoryObjectWithChildren()) as RxFormGroup);
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.forces.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.forces.value, event.previousIndex, event.currentIndex);
    this.correctForcePositions();
  }

  correctForcePositions()
  {
    let forces = this.forces.controls;
    forces.forEach((force, idx) => {
      force.get('position').setValue(idx+1);
    })
    
  }

  onSubmit() {
    if (this.consultantForm.valid) {
      console.log(this.consultantForm.value);
      this.consultantService.update(this.consultantForm.value).subscribe(result=>{
        console.log("Consultant: "+result);
        this.dataStorageService.consultant = result;
        this.consultantForm.reset();
        this.router.navigate([`detail/${result.id}`]);
       });
       
    }
  }

}
