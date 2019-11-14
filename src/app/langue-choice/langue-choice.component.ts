import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Competence, CompetenceItem } from '../classes';
import { LangueService } from '../services/langue.service';
import {FormControl, FormBuilder, FormArray, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-langue-choice',
  templateUrl: './langue-choice.component.html',
  styleUrls: ['./langue-choice.component.css']
})
export class LangueChoiceComponent implements OnInit {

  @Input() languesArray: Array<Competence>;
  @Output() languesChange = new EventEmitter();
  langueForm: FormGroup;
  myFormValueChanges$;
  
  options: Array<CompetenceItem>;
  // myControl = new FormControl();
  filteredOptions: Observable<CompetenceItem[]>;

  constructor(
    private langueService: LangueService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.getOptions();    
    // this.setLangues();
    this.langueForm = this.fb.group({
      langues: this.fb.array([
        this.fb.group({description:'', niveau: ''})
        // this.languesArray
      ])
    });
    this.myFormValueChanges$ = this.langueForm.controls['langues'].valueChanges;
    this.langueForm.patchValue({langues: this.languesArray});
    this.myFormValueChanges$.subscribe(langues => this.languesArray=langues);
  }

  private getLangue(){
    return this.fb.group({description: '', niveau: ''});
  }

  addLangue() {
    const control = <FormArray>this.langueForm.controls['langues'];
    control.push(this.getLangue());
  }

  removeLangue(i: number) {
    const control = <FormArray>this.langueForm.controls['langues'];
    control.removeAt(i);
  }


  // get langueItems() {
  //   return this.langueForm.get('langues') as FormArray;
  // }

  // setLangues(){
  //   if(this.langues){
  //     if(this.langues[0]){
  //       let consultantLangues = new Array<CompetenceItem>();
  //       for(let langue of this.langues){
  //         consultantLangues.push
  //       }
  //       this.myControl.setValue(this.langues[0].parent2); 
  //     }
  //     else{
  //       this.myControl.setValue(new CompetenceItem); 
  //     }         
  //   }
  //   else{
  //     this.langues = new Array<Competence>();
  //   }
  // }

  getOptions(){
    this.langueService.getAllOrdered("description").subscribe(result => 
      {
       this.options=result;
      //  this.getFilteredOptions();
      }
    );
  }

  // getFilteredOptions(){
  //   this.filteredOptions = this.myControl.valueChanges
  //     .pipe(
  //       startWith<string | any>(''),
  //       map(value => typeof value === 'string' ? value : value.description),
  //       map(description => description ? this._filter(description) : this.options)
  //     );
  // }

  // addElement(){
  //   if(!this.langues){
  //     this.langues = new Array<Competence>();
  //   }
  //   this.langues.push(new Competence());
  //   this.onChange();
  // }

  // onChange(){
  //   this.languesChange.emit(this.langues);
  // }

  // selectedOption(event: any){
  //   console.log(event);
  //   if(event.id === 0){	  
  //     this.langueService.create(event).subscribe(result => 
  //       this.languesChange.emit(result));	  
  //   }
  //     else{
  //       let langue = new Competence();
  //       langue.parent2 = event;
  //       this.langues.push(langue);
  //       this.languesChange.emit(this.langues);
  //     }
  // }

  // private _filter(description: string): CompetenceItem[]{
  //   let results = this.options.filter(option => 
  //     option.description.toLowerCase().indexOf(description.toLowerCase()) === 0);
  //   if (results.length < 1) {
  //     results= [{"description": description, "id": 0}];
  //       }
  //     return results;
  //   }
  
    displayFn(item: CompetenceItem): string | undefined {
      return item ? item.description : undefined;
    }
  
}
