import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ForceService } from '../services/force.service';
import { Force, ForceItem } from '../classes';

@Component({
  selector: 'app-force-choice',
  templateUrl: './force-choice.component.html',
  styleUrls: ['./force-choice.component.css']
})
export class ForceChoiceComponent implements OnInit {

  @Input() inputChild: Array<Force>;
  @Output() childForm: EventEmitter<Array<Force>> = new EventEmitter<Array<Force>>();
  options: Array<ForceItem>;
  swap: boolean;

  constructor(private forceService: ForceService) {
    this.options = new Array<ForceItem>();
   }

  ngOnInit() {
    if(!this.swap){
        this.getOptions();
      }
      this.swap = false;    
  }

  getOptions(): void {
    this.forceService.getAll().subscribe(options => 
      {
        // if(!this.input){
        //   this.input = new Array<Force>();
        //   let i = 1;
        //   for(let option of options){
        //     let force = new Force();
        //     force.position = i;
        //     force.parent2 = option;
        //     this.input.push(force);
        //     i=i+1;
        //   }
        //   this.childForm.emit(this.input);
        // }
        console.log(this.inputChild);
        this.options = options;
      }
      );
  }

  selectedOption(key1: number, key2: number){  
      this.swapArray(this.inputChild, key1, key2);
    }


    swapArray(array:any, key1:number, key2:number) : any
    {
        var temp = array[key1].parent2;
        array[key1].parent2 = array[key2].parent2;
        array[key2].parent2 = temp;
        this.swap = true;
        this.ngOnInit();
    }

}
