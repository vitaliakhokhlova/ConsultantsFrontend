import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  @Input() birthday: Date;
  @Output() birthdayChange = new EventEmitter<Date>();
  startDate = new Date(1990, 0, 1);

  constructor(private _adapter: DateAdapter<any>) { }

  ngOnInit() {
    this._adapter.setLocale('fr');
  }

  onChange(){
    this.birthdayChange.emit(this.birthday);
  }

}
