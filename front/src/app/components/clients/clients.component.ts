import { TestdataService } from './../../services/testdata.service';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';


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

  constructor(
    public _testService : TestdataService,
    public _clientS : ClientService ) { }

  ngOnInit() {
    document.querySelector('ul').classList.add('floatLeft')
    this._clientS.getListAll().subscribe( data => {
      console.log( data );
    })
  }


}
