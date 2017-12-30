import { TestdataService } from './../../services/testdata.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styles: []
})
export class ClientsComponent implements OnInit {

  title : string = "Clientes";

  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";

  constructor( public _testService : TestdataService ) { }

  ngOnInit() {
    this._testService.getData();
    document.querySelector('ul').classList.add('floatLeft')
  }


}
