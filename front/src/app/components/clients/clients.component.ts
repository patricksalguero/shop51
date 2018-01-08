import { TestdataService } from './../../services/testdata.service';
import { Component, OnInit , ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';
import swal from 'sweetalert2'


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

  showModal( item: any  , index : number ){
    swal({
      title: '¿ Seguro de eliminar ?',
      text: 'Cliente: ' + item['name'],
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar.',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this._clientS.deleteClient( item['_id'] )
          .subscribe( data => {

            $.toast({
              heading: '<h2>Eliminado</h2>',
              text: '<p>'+ 'Se ha eliminado con exito' +'</p>',
              showHideTransition: 'fade',
              icon: 'success',
              position : 'top-right'
            })

            this.data.splice( index, 1 );
            swal.close();

          })


      // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      } else if (result.dismiss === 'cancel') {
        // swal(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })

  }


}
