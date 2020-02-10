import { Component, OnInit, Input, SkipSelf } from '@angular/core';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormControl, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-mat-datepicker',
  templateUrl: './mat-datepicker.component.html',
  styleUrls: ['./mat-datepicker.component.css'],
  providers: 
  [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
  viewProviders: [
      {
          provide: ControlContainer,
          useFactory: (container: ControlContainer) => container,
          deps: [[new SkipSelf(), ControlContainer]],
      }]
})

export class MatDatepickerComponent implements OnInit {

  @Input() placeholder: string;
  @Input() local: string;
  @Input() startDate: Date;
  @Input() controlName: string;

  constructor(private _adapter: DateAdapter<any>) { }

  ngOnInit() {
    this._adapter.setLocale(this.local);
  }

}
