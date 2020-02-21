import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-mat-autocomplete',
  viewProviders: [{ 
    provide: ControlContainer, 
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }],
  template: `
  <mat-form-field  style="width:20vw" #focusMe>
    <input matInput [placeholder]="placeholder" [formControlName]="controlName" [matAutocomplete]="auto" required>        
    <mat-autocomplete #auto="matAutocomplete" >   
      <mat-option *ngFor="let option of filteredOptions | async" (onSelectionChange)="selectedOption(option)"[value]="option[property]" >
        {{option[property]}}
      </mat-option>
    </mat-autocomplete>
  </mat-form-field>
  `
})
export class MatAutocompleteComponent implements OnInit {
 
  @Input() controlName: string;
  @Input() options: any[];
  @Input() placeholder: string;
  @Input() property: string;
  @Output() createNewOption = new EventEmitter<boolean>();

  filteredOptions: Observable<any[]>;

  @ViewChild(MatAutocompleteTrigger, { static: false }) trigger: MatAutocompleteTrigger;
  subscription: any;

  constructor(private parentForm: ControlContainer) {
  }

  ngOnInit() {
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
      });
  }

  private _subscribeAgain() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
    this.ngAfterViewInit();
  }

  get parentProperty(){
    let v= this.parentForm.control.get(this.property);
    return v;
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
  
  displayFn(item): string {
    return item[this.property];
  }

  selectedOption(option){
    this.parentForm.control.patchValue({id: option.id});
    if(option.id === 0){	
      this.options.push({id: 0, [this.property]: option.new});
      this.parentForm.control.patchValue({[this.property]: option.new}) 
      this.createNewOption.emit(true);
    }
  }

}
