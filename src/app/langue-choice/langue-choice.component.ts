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

  @Input() languesArray;
  @Output() languesChange = new EventEmitter();
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
    this.createForm();   
  }

  createForm(){
    this.langueForm = this.fb.group(
      {
        langues: this.fb.array(
          this.languesArray.map(langue => this.createLangue(langue))
        )
      }
    );
    const control = <FormArray>this.langueForm.controls['langues'];
    for (var i of [...Array(control.length).keys()]){
      this.getFilteredOptions(i);
    }
    this.onChange();
  }

  onChange(){
    this.myFormValueChanges$ = this.langueForm.controls['langues'].valueChanges;
    this.myFormValueChanges$.subscribe(value =>{ 
      Object.assign(this.languesArray, value);
      this.languesChange.emit(this.languesArray);
    });
  }

  private getLangue(){
    return this.fb.group(new Competence());
  }

  createLangue(langue: Competence): FormGroup {
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
    control.push(this.getLangue());
    this.getFilteredOptions(control.length - 1);
  }

  removeLangue(i: number) {
    this.languesArray.splice(i, 1);
    console.log(this.languesArray);
    this.languesChange.emit();
    const control = <FormArray>this.langueForm.controls['langues'];
    control.removeAt(i);
    this.filteredOptions.splice(i, 1);
  }

  getOptions(){
    this.langueService.getAllOrdered("description").subscribe(result => 
      {
       this.options=result;
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
      this.langueService.create(option).subscribe(result => option.id = result.id);	  
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
  
}
