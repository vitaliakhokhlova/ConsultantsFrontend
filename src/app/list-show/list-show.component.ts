import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-show',
  templateUrl: './list-show.component.html',
  styleUrls: ['./list-show.component.css']
})
export class ListShowComponent implements OnInit {

  @Input() inputArray: any[];
  @Input() headElements: string[];
  @Input() keysToShow: string[];

  @Output() itemToDelete = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  show(item): void { 
    this.router.navigate([`detail/${item.id}`]);    
 }

  edit(item): void { 
    this.router.navigate([`edit/${item.id}`]);    
  }

  delete(item): void{
    this.itemToDelete.emit(item);
  }

}


