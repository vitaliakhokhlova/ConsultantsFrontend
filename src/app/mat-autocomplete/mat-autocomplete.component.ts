import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-mat-autocomplete',
  templateUrl: './mat-autocomplete.component.html',
  styleUrls: ['./mat-autocomplete.component.css']
})
export class MatAutocompleteComponent implements OnInit {

  @Input() parentForm: FormGroup;  
  @Input() options: any[];
  @Input() placeholder: string;
  @Input() property: string;
  @Output() createNewOption = new EventEmitter<boolean>();

  filteredOptions: Observable<any[]>;

  @ViewChild(MatAutocompleteTrigger, { static: false }) trigger: MatAutocompleteTrigger;
  @ViewChild('focusMe',{ static: false }) _focusMe: ElementRef;
  activeOptionValueOnPanelClosingActions;
  subscription: any;

  constructor() {}

  ngOnInit() {
    console.log(this.options);   
    this.filteredOptions = this.parentProperty.valueChanges
    .pipe(
      startWith<string | any>(''),
      map(input => typeof input === 'string' ? input : input[this.property]),
      map(input => input ? this._filter(input) : this.options)
    );
  }

  ngAfterViewInit() {
    this.subscription = this.trigger.panelClosingActions.subscribe(event => 
      {
        if (!event) {
          this.parentProperty.setValue("");
          this._subscribeAgain();
        }
        console.log(event)
      });
  }

  private _subscribeAgain() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
    this.ngAfterViewInit();
  }

  get parentProperty(){
    return this.parentForm.get(this.property);
  }

  private _filter(input: string){
    let filteredResults = this.options.filter(option => 
      option[this.property].toLowerCase().indexOf(input.toLowerCase()) === 0);
    if (filteredResults.length < 1) 
    {
      filteredResults= [{[this.property]: "Pas de '"+input+"'. Créer?", "new": input, "id": 0}];
    }
    return filteredResults;
  }
  
  displayFn(item): string | undefined {
    return item ? item[this.property] : undefined;
  }

  selectedOption(option){
    this.parentForm.patchValue({id: option.id});
    if(option.id === 0){	
      this.options.push({id: 0, [this.property]: option.new});
      this.parentForm.patchValue({[this.property]: option.new}) 
      this.createNewOption.emit(true);
    }
  }

}
