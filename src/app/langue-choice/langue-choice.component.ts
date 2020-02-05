import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteTrigger, MatOptionSelectionChange } from '@angular/material';

@Component({
  selector: 'app-langue-choice',
  templateUrl: './langue-choice.component.html',
  styleUrls: ['./langue-choice.component.css']
})
export class LangueChoiceComponent implements OnInit {

  @Input() parentForm: FormGroup;  
  @Input() options: any[];
  @Input() placeholder: String;
  @Output() createNewOption = new EventEmitter<boolean>();

  filteredOptions: Observable<any[]>;
  isSelected: boolean;

  @ViewChild(MatAutocompleteTrigger, { static: false }) trigger: MatAutocompleteTrigger;
  @ViewChild('focusMe',{ static: false }) _focusMe: ElementRef;
  activeOptionValueOnPanelClosingActions;
  isAnythingEmitted: boolean = null;
  emittedValue: any;

  subscription: any;

  constructor() {
   }

  ngOnInit() {   
    this.filteredOptions = this.parent.valueChanges
    .pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : value.description),
      map(description => description ? this._filter(description) : this.options)
    );
      //this.parentDescription.setValidators(this.forceToChoose());
      //this.parentDescription.setErrors({notSelected: true});
      //this.parentDescription.updateValueAndValidity();
  }

  ngAfterViewInit() {
    this.subscription = this.trigger.panelClosingActions
      .subscribe(e => 
        {
        if (!!e) {
          this.isAnythingEmitted = true;
        }

        if (e instanceof MatOptionSelectionChange) {
          this.emittedValue = e.source.value;
        }
        if (!e) {
          // this.trigger.writeValue(null);
          this.parentDescription.setValue(null);
          this.emittedValue = null;
          this._subscribeAgain();
          //setTimeout(() => this._focusMe.nativeElement.focus(), 500);
        }
        console.log(e)
      },
      e => console.log('error', e));
  }

  private _subscribeAgain() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
    this.ngAfterViewInit();
  }

  get parent(){
    return this.parentForm.get('parent2');
  }

  get parentDescription(){
    return this.parent.get('description');
  }

  private _filter(description: string){
    let filteredResults = this.options.filter(option => 
      option.description.toLowerCase().indexOf(description.toLowerCase()) === 0);
    if (filteredResults.length < 1) 
    {
      filteredResults= [{"description": "Pas de langue '"+description+"'. Créer?", "langue": description, "id": 0}];
    }
    return filteredResults;
  }
  
  displayFn(item): string | undefined {
    return item ? item.description : undefined;
  }

  selectedOption(option){
    this.parentForm.patchValue({
          parent2: {
            id: option.id
          }
        });
    if(option.id === 0){	
      this.options.push({id: 0, description: option.langue});
      this.parentForm.patchValue({parent2:{description: option.langue}}) 
      this.createNewOption.emit(true);
    }
  }

  // forceToChoose(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const index = this.options.findIndex(option => {
  //       return new RegExp("^" + option.description + "$").test(control.value);
  //     });
  //     return index < 0 ? { forbiddenNames: { value: control.value } } : null;
  //   };
  // }
}
