import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ConsultantService} from '../services/consultant.service';
import { DataStorageService } from "../services/data-storage.service";
import { Consultant, HistoryObject, HistoryObjectWithChildren, Factory, ResourceWithDescription, Force, ForceItem, Langue, LangueItem } from '../classes';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder, RxFormGroup, RxFormArray } from '@rxweb/reactive-form-validators';
import { ForceService } from '../services/force.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { LangueService } from '../services/langue.service';

@Component({
  selector: 'app-input-form-editor',
  templateUrl: './input-form-editor.component.html',
  styleUrls: ['./input-form-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFormEditorComponent implements OnInit {

  consultantForm: RxFormGroup;
  forces_loaded = false;
  isPatched: boolean;  
  options: Array<LangueItem>;

  constructor(
    private route: ActivatedRoute,
    //  private cdRef: ChangeDetectorRef,
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

  patchForm(id: number){
    this.dataStorageService.getConsultant(id).subscribe(
      data => 
        {      
          this.consultantForm.patchValue(data);
          this.consultantForm.patchValue({birthday: new Date(data.birthday)});
          data.formations.forEach(x => this.formations.push(this.fb.group(x)));    
          data.forces.forEach(x => this.forces.push(this.fb.group(x)));
          data.langues.forEach(x => this.langues.push(this.fb.group(x)));
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
            //x.details.push(new ResourceWithDescription());     
            this.projets.push(this.fb.group(x));
          });
          data.parcours.forEach(x => {
            //x.details.push(new ResourceWithDescription());
            this.parcours.push(this.fb.group(x));
          });              
        },
        err => {
          console.log(err);
        },
        ()=>{          
          //  this.cdRef.detectChanges(); 
          this.dataStorageService.getLangues().subscribe
          (langues => 
            {
              this.options=langues;
            },
            err => {
              console.log(err);
            },
            () => 
            {   
              if(this.forces.value.length == 0)
              {
                this.dataStorageService.getForces().subscribe(
                  forces => 
                  { 
                    this.addForcesToForm(forces);
                  },
                  err => {
                    console.log(err);
                  },
                  () => 
                  { 
                    this.isPatched = true;
                    console.log(this.isPatched);
                  });   
              }     
              else{
                this.isPatched = true;
            }
            }
          );
           
        }
    ); 
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

  get langues() {
    return this.consultantForm.get('langues') as FormArray;
  }

  delete(array, i) {
    array.removeAt(i);
  }

  onSubmit(competences?) {
    console.log(event)
    if (this.consultantForm.valid) {
      this.consultantService.update(this.consultantForm.value).subscribe(result=>{
        this.dataStorageService.consultant = result;  
        if(competences)
        {
          this.goTo(`competences/${result.id}`);
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
  
}
