import { TestdataService } from './../../services/testdata.service';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

declare var $;

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

  toggleActive( item , index ){
    let number = 1;
    let activMsg = "Activado";
    if( item['isActive'] === 1 ){
      number = 2;
      this.data[index]['isActive'] = number;
      activMsg = "Desactivado";
    }else if ( item['isActive'] === 2 ){
      number = 1;
      this.data[index]['isActive'] = number;
      let activMsg = "Activado";
    }

    this._clientS.updateClient( this.data[index] )
      .subscribe( result => {
        $.toast({
          heading: '<h2>'+ activMsg +'</h2>',
          text: '<p>'+ 'Cliente ' + this.data[index]['name'] +'</p>',
          showHideTransition: 'fade',
          icon: 'success',
          position : 'top-right'
        })
      })
  }


}
