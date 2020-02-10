import { Component, OnInit, Input, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-mat-select',
  templateUrl: './mat-select.component.html',
  styleUrls: ['./mat-select.component.css'],
  viewProviders: [{ 
    provide: ControlContainer, 
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }]
})
export class MatSelectComponent implements OnInit {
  @Input() controlName: string;
  @Input() options: any[];
  @Input() propertyToShow: string;
  @Input() propertyToGet: string;
  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {
  }

}
