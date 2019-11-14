import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ForceService } from '../services/force.service';
import { Force, ForceItem } from '../classes';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-force-choice',
  templateUrl: './force-choice.component.html',
  styleUrls: ['./force-choice.component.css']
})
export class ForceChoiceComponent implements OnInit {

  @Input() options: Array<Force>;
  @Output() optionsChange = new EventEmitter();

  constructor(private forceService: ForceService) {}

  ngOnInit() {
    this.getOptions();
  }

  getOptions(): void {
    if(!this.options){
      this.forceService.getAll().subscribe(options => 
        {
          console.log(options);  
          this.options = new Array<Force>();
          let i = 1;
          for(let option of options){
            let force = new Force();
            force.position = i;
            force.parent2 = new ForceItem();
            force.parent2.id = option.id;
            force.parent2.description = option.description;
            this.options.push(force);
            i=i+1;
          }
          this.optionsChange.emit(this.options);
        }
        );
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.options, event.previousIndex, event.currentIndex);
    this.correctPosition();
  }

  correctPosition(){
    let i=1;
    for(let option of this.options)
    {
      option.position=i;
      i=i+1;
    }
  }
}
