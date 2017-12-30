import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  currentDate :boolean  = true;
  title : string = "Dashboard";

  constructor() { }

  ngOnInit() {
  }

}
