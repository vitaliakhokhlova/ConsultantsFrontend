import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Langue, LangueItem } from '../classes';
import { LangueService } from '../services/langue.service';
import { FormBuilder, FormArray, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { RxFormGroup, RxFormBuilder } from '@rxweb/reactive-form-validators';

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
  
  @Input() options: Array<LangueItem>;
  filteredOptions: Observable<LangueItem[]>[]=[];

  constructor(
    private langueService: LangueService,
    private fb: RxFormBuilder,
    //private ref: ChangeDetectorRef
    ) { }

  ngOnInit() {     
      this.createFilteredOptions(); 
  }

  // ngOnChanges() {
  //   this.ref.detectChanges()
  // }

  createFilteredOptions(){
    // this.componentFormGroup = this.fb.group({
    //     langues: this.fb.array(this.fillFormArray())
    // });
    for (var i of [...Array(this.langues.length).keys()]){
      this.getFilteredOptions(i);
    }    
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

  selectedOption(indx: number, option: LangueItem){
    if(option.id === 0){	 
      let langue = new LangueItem();
      langue.description = option.description;
      this.langueService.create(langue).subscribe(result => {
        option.id = result.id;
      });	  
    }
    else{
      this.langues.at(indx).patchValue({
        parent2: {
          id: option.id
        }
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
