import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Competence, CompetenceItem } from '../classes';
import { LangueService } from '../services/langue.service';
import { FormBuilder, FormArray, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-langue-choice',
  templateUrl: './langue-choice.component.html',
  styleUrls: ['./langue-choice.component.css']
})
export class LangueChoiceComponent implements OnInit {

  @Input() languesArray: Array<Competence>;
  @Output() languesArrayChange = new EventEmitter();
  langueForm: FormGroup;
  myFormValueChanges$;  
  
  options: Array<CompetenceItem>;
  filteredOptions: Observable<CompetenceItem[]>[]=[];

  constructor(
    private langueService: LangueService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {   
    this.getOptions();   
  }

  createForm(){
    this.langueForm = this.fb.group({
        langues: this.fb.array(this.fillFormArray())
    });
    const control = <FormArray>this.langueForm.controls['langues'];
    for (var i of [...Array(control.length).keys()]){
      this.getFilteredOptions(i);
    }
    this.onChange();
  }

  fillFormArray(){
    if(!this.languesArray){
      this.languesArray = new Array<Competence>();
      this.languesArrayChange.emit(this.languesArray);
      this.languesArray.push(new Competence());
    }
    return this.languesArray.map(langue => this.copyLangue(langue));
  }

  onChange(){
    this.myFormValueChanges$ = this.langueForm.controls['langues'].valueChanges;
    this.myFormValueChanges$.subscribe(value =>{ 
      Object.assign(this.languesArray, value);
      this.languesArrayChange.emit(this.languesArray);
    });
    
  }

  private newLangue(){
    return this.fb.group(new Competence());
  }

  copyLangue(langue: Competence): FormGroup {
    return this.fb.group({
      parent2: [langue.parent2],
      niveau: [langue.niveau],
      id: [langue.id],
      annee: [langue.annee],
      experience: [langue.experience]
    });
  }

  addLangue() {
    const control = <FormArray>this.langueForm.controls['langues'];
    control.push(this.newLangue());
    this.getFilteredOptions(control.length - 1);
  }

  removeLangue(i: number) {
    this.languesArray.splice(i, 1);
    this.languesArrayChange.emit();
    const control = <FormArray>this.langueForm.controls['langues'];
    control.removeAt(i);
    this.filteredOptions.splice(i, 1);
  }

  getOptions(){
    this.langueService.getAllOrdered("description").subscribe(result => 
      {
       this.options=result;
       this.createForm(); 
      }
    );
  }

  getFilteredOptions(index: number){
    const arrayControl = this.langueForm.get('langues') as FormArray;
    this.filteredOptions[index] = arrayControl.at(index).get('parent2').valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.description),
        map(description => description ? this._filter(description) : this.options)
      );
  }


  selectedOption(option: any){
    if(option.id === 0){	 
      let langue = new CompetenceItem();
      langue.description = option.description;
      this.langueService.create(langue).subscribe(result => {
        option.id = result.id;
      });	  
    }
  }

  private _filter(description: string): CompetenceItem[]{
    let results = this.options.filter(option => 
      option.description.toLowerCase().indexOf(description.toLowerCase()) === 0);
    if (results.length < 1) {
      results= [{"description": description, "id": 0}];
        }
      return results;
    }
  
    displayFn(item: CompetenceItem): string | undefined {
      return item ? item.description : undefined;
    }
  
    focusOutFunction(event)
    {
      console.log(event.target.value);
    }
}
