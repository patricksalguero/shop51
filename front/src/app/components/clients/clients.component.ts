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

  public loading = false;

  constructor(
    public _testService : TestdataService,
    public _clientS : ClientService ) { }

  ngOnInit() {
    this.callList();
  }

  callList(){
    this.loading = true;
    this._clientS.getListAll().subscribe( data => {
      console.log( data );
      this.data = data;
      this.loading = false;
    }, err => {
      if ( err.status == 401 || err.status == 403 ){
        this.callList();
      }
      this.loading = false;
    })
  }


}
