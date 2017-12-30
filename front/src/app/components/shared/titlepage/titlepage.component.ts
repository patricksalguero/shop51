import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-titlepage',
  templateUrl: './titlepage.component.html',
  styles: []
})
export class TitlepageComponent implements OnInit {

  @Input('title') title : string  ="";
  @Input('date') date : boolean = false;

  currentDate : Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
