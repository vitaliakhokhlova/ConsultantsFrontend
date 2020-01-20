import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
],
})
export class DateComponent implements OnInit {

  @Input() birthday: Date;
  @Output() birthdayChange = new EventEmitter<Date>();
  startDate = new Date(1990, 0, 1);

  

  constructor(private _adapter: DateAdapter<any>) { }

  ngOnInit() {
    this._adapter.setLocale('fr');
    if (this.birthday) {
      let dateOld: Date = new Date(this.birthday);
      this.birthday = dateOld;
        }
  }

  onChange(){
    this.birthdayChange.emit(this.birthday);
  }

}
