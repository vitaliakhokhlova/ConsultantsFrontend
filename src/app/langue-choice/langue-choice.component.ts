import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Langue, LangueItem } from '../classes';
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

  //@Input() languesArray: Array<Langue>;
  //@Output() languesArrayChange = new EventEmitter();
  //@Output() onComponentReady: EventEmitter<FormArray> = new EventEmitter<FormArray>();
  @Input() parentForm: FormGroup;
  
  options: Array<LangueItem>;
  filteredOptions: Observable<LangueItem[]>[]=[];

  constructor(
    private langueService: LangueService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {   
    this.langueService.getAllOrdered("description").subscribe(
      result => 
      {
       this.options=result;       
      },
      err => {
        console.log(err);
      },
      () => {
        this.createFilteredOptions(); 
        //this.onChange();
      });     
  }

  createFilteredOptions(){
    // this.componentFormGroup = this.fb.group({
    //     langues: this.fb.array(this.fillFormArray())
    // });
    for (var i of [...Array(this.langues.length).keys()]){
      this.getFilteredOptions(i);
    }    
  }

  // fillFormArray(){
  //   if(!this.languesArray){
  //     this.languesArrayChange.emit(new Array<Langue>());
  //     this.languesArray.push(new Langue());
  //   }
  //   return this.languesArray.map(langue => this.copyLangue(langue));
  // }

  onChange(){
    //this.langues.valueChanges.subscribe(
      //value =>{ 
      //Object.assign(this.languesArray, value);
      //this.languesArrayChange.emit(this.languesArray);
      //this.languesArrayChange.emit(value);
      //this.onComponentReady.emit(this.langues);
    //});   
  }

  copyLangue(langue: Langue): FormGroup {
    return this.fb.group({
      parent2: [langue.parent2],
      niveau: [langue.niveau],
      id: [langue.id]
    });
  }

  addLangue() {
    this.langues.push(this.fb.group(new Langue()));
    this.getFilteredOptions(this.langues.length - 1);
  }

  get langues(){
    return <FormArray>this.parentForm.controls['langues'];
  }

  removeLangue(i: number) {
    //this.languesArray.splice(i, 1);
    //this.languesArrayChange.emit();
    this.langues.removeAt(i);
    this.filteredOptions.splice(i, 1);
  }

  getFilteredOptions(index: number){
    this.filteredOptions[index] = this.langues.at(index).get('parent2').valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.description),
        map(description => description ? this._filter(description) : this.options)
      );
  }

  selectedOption(option: any){
    if(option.id === 0){	 
      let langue = new LangueItem();
      langue.description = option.description;
      this.langueService.create(langue).subscribe(result => {
        option.id = result.id;
      });	  
    }
  }

  private _filter(description: string): LangueItem[]{
    let filteredResults = this.options.filter(option => 
      option.description.toLowerCase().indexOf(description.toLowerCase()) === 0);
    if (filteredResults.length < 1) {
      filteredResults= [{"description": description, "id": 0}];
        }
      return filteredResults;
  }
  
  displayFn(item: LangueItem): string | undefined {
    return item ? item.description : undefined;
  }
}
