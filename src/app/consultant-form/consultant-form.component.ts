import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { ConsultantService} from '../services/consultant.service';
import { DataStorageService } from "../services/data-storage.service";
import { Consultant, HistoryObject, HistoryObjectWithChildren, Factory, ResourceWithDescription, Force, ForceItem, Langue, LangueItem } from '../classes';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder, RxFormGroup, RxFormArray } from '@rxweb/reactive-form-validators';
import { LangueService } from '../services/langue.service';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-consultant-form',
  templateUrl: './consultant-form.component.html',
  styleUrls: ['./consultant-form.component.css']
})
export class ConsultantFormComponent implements OnInit {

  consultant: Consultant;
  consultantForm: RxFormGroup;
  matcher = new MyErrorStateMatcher();
  forces_loaded = false;
  isPatched = false;
  langueItems: Array<LangueItem>;
  forceItems = new FormArray([]);
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
    [  {name: 'interests', placeholder: 'Intérêts'}]
  ];

  historyObjectFields=[
    {property: 'description', placeholder:'Description' },
    {property: 'institution', placeholder: 'Organisation'},
    {property: 'place', placeholder: 'Ville'},
    {property: 'dates', placeholder: 'Dates'}
  ];
  startDate = new Date(1990, 0, 1);
  historyArraysNames = ['formations', 'projets', 'parcours'];
  isWithChildren = [false, true, true];
  preview: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: RxFormBuilder,
    private dataStorageService: DataStorageService,
    private consultantService: ConsultantService,
    private langueService: LangueService
    ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.createForm();
    this.patchForm(id);
  }

  createForm(){
    this.consultantForm = this.fb.formGroup(new Consultant()) as RxFormGroup;
  }

  patchForm(id: number){
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
        this.dataStorageService.getConsultant(id).subscribe(
          data =>
            {
              this.consultant = data;
              this.consultantForm.patchValue(data);
              this.consultantForm.patchValue({birthday: new Date(data.birthday)});
              data.formations.forEach(x => this.formations.push(this.fb.group(x)));
              data.forces.forEach(x => this.forces.push(this.fb.group(x)));
              data.langues.forEach(x => {
                let langue = this.fb.formGroup(new Langue());
                langue.patchValue(x);
                this.langues.push(langue);
              }
              );
              data.competences.forEach(x => {
                let comp = this.fb.group({
                  id: x.id,
                  experience: x.experience,
                  annee: x.annee,
                  contexte: x.contexte,
                  interet: x.interet,
                  niveau: x.niveau,
                  parent2: {id: x.parent2.id}
                });
                this.competences.push(comp);
              });
              data.projets.forEach(x => {
                if(!x.details.length)
                {
                  x.details.push(new ResourceWithDescription());
                }
                this.projets.push(this.fb.group(x));
              });
              data.parcours.forEach(x => {
                if(!x.details.length)
                {
                x.details.push(new ResourceWithDescription());
                }
                this.parcours.push(this.fb.group(x));
              });
            },
          err =>
          {
            console.log(err);
          },
          () =>
          {
              this.dataStorageService.getForces().subscribe(
                forces =>
                {
                  let indexes = [];
                  this.consultant.forces.forEach(x => indexes.push(x.parent2.id));
                  forces = forces.filter(x => indexes.indexOf(x.id)==-1);
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
                },
                () =>
                {
                  this.isPatched = true;
                  console.log("The form is patched");
                });
            }
        );
      }
    );
  }

  get forces() {
    return this.consultantForm.get('forces') as FormArray;
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
  get formations(): FormArray {
    return this.consultantForm.get('formations') as RxFormArray;
  }

  get parcours() {
    return this.consultantForm.get('parcours') as RxFormArray;
  }

  get projets() {
    return this.consultantForm.get('projets') as RxFormArray;
  }

  addHistoryObjectWithChildren(arrayName: string, isWithDetails: boolean){
    let array = this.consultantForm.get(arrayName) as RxFormArray;
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

  get competences() {
    return this.consultantForm.get('competences') as FormArray;
  }

  get langues() {
    return this.consultantForm.get('langues') as FormArray;
  }

  addLangue() {
    this.langues.push(this.fb.formGroup(new Langue()));
  }

  onSubmit(showCompetences?) {
    console.log( this.consultantForm.toFormData());

    if (this.consultantForm.valid) {
      let consultant = this.consultantForm.value;
      consultant.projets.forEach(projet =>{
        projet.details = projet.details.filter(detail => detail.description!="");
      });
      consultant.parcours.forEach(parcour =>{
        parcour.details = parcour.details.filter(detail => detail.description!="");
      });
      this.consultantService.update(consultant).subscribe(result=>{
        this.dataStorageService.consultant = result;
        if(showCompetences)
        {
          this.goTo(`edit_competences/${result.id}`);
        }
        else{
          this.goTo(`detail/${result.id}`);
        }
       });
    }
  }

  goTo(route: string){
    this.router.navigate([route]);
  }

  createNewLanguage(langueConsultant){
    let item = new LangueItem();
    item.description = langueConsultant.value.parent2.description;
    this.langueService.update(item).subscribe(result => {
      langueConsultant.controls['parent2'].patchValue({"id": result.id, "description": result.description});
    });
  }

  delete(array, i: number) {
    array.removeAt(i);
  }

  onFileChange(event){
    if(event.target.files && event.target.files.length) {
      let file =  event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.consultantForm.get('userpic').setValue(reader.result);
        this.consultantForm.get('userpic').updateValueAndValidity();
      }

    }
  }



}
