import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Langue, LangueItem } from '../classes';
import { LangueService } from '../services/langue.service';
import { FormArray, FormGroup} from '@angular/forms';
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
  @Input() parentForm: RxFormGroup;
  
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
    for (var i of [...Array(this.items.length).keys()]){
      this.getFilteredOptions(i);
    }    
  }

  addItem() {
    this.items.push(this.fb.group(new Langue()));
    this.getFilteredOptions(this.items.length - 1);
  }

  get items(){
    return <FormArray>this.parentForm.controls['langues'];
  }

  removeItem(i: number) {
    //this.languesArray.splice(i, 1);
    //this.languesArrayChange.emit();
    this.items.removeAt(i);
    this.filteredOptions.splice(i, 1);
  }

  getFilteredOptions(index: number){
    this.filteredOptions[index] = this.items.at(index).get('parent2').valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.description),
        map(description => description ? this._filter(description) : this.options)
      );
  }

  selectedOption(indx: number, option: LangueItem){
    if(option.id === 0){	 
      let item = new LangueItem();
      item.description = option.description;
      this.langueService.create(item).subscribe(result => {
        option.id = result.id;
      });	  
    }
    else{
      this.items.at(indx).patchValue({
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
