import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ForceService } from '../services/force.service';
import { Force, ForceItem } from '../classes';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-force-choice',
  templateUrl: './force-choice.component.html',
  styleUrls: ['./force-choice.component.css']
})
export class ForceChoiceComponent implements OnInit {

  @Input() initialOption: Force[];
  @Output() childForm = new EventEmitter();
  options: ForceItem[];
  formControl = new FormControl();
  swap: boolean;

  constructor(private forceService: ForceService) {
    this.options = new Array<ForceItem>();
   }

  ngOnInit() {
    if(!this.swap){
        this.getOptions();
      }
      this.swap = false;    
    // this.formControl.setValue(this.initialOption);
  }

  getOptions(): void {
    this.forceService.getAll().subscribe(options => this.options = options);
  }

  selectedOption(key1: number, key2: number){  
      this.swapArray(this.initialOption, key1, key2);
    }


    swapArray(array:any, key1:number, key2:number) : any
    {
        console.log(array);
        console.log(key1);    
        console.log(key2);   
        var temp = array[key1].parent2;
        array[key1].parent2 = array[key2].parent2;
        array[key2].parent2 = temp;
        this.swap = true;
        this.ngOnInit();
    }

}
