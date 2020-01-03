import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'consultants';
  view=true;

  constructor(
    private route: ActivatedRoute
  ) { }

  reload(){
    this.view=false;
    setTimeout(()=>this.view=true);
  }
}
