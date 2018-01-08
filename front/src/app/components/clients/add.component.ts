import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ClientService } from '../../services/client.service';

declare var $;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: []
})
export class AddComponent implements OnInit {
  public title : string = "Agregar Cliente"
  public client : any =  {
    name : '',
    lastname: '',
    email : '',
    address : ''
  }

  constructor(private _clientS : ClientService , private _router : Router ) { }

  ngOnInit() {
  }

  addClient(){
    // console.info( this.client )
    this._clientS.addClient( this.client  ).subscribe( result => {
      $.toast({
        heading: '<h2>Exitoso</h2>',
        text: '<p>'+ 'Se ha registado con exito' +'</p>',
        showHideTransition: 'fade',
        icon: 'success',
        position : 'top-right'
      })
      this._router.navigate(['clients']);
    }, err => {
      $.toast({
        heading: '<h2>Error</h2>',
        text: '<p>'+ 'Ha sucedido un error , intentalo nuevamente por favor.' +'</p>',
        showHideTransition: 'fade',
        icon: 'error',
        position : 'top-right'
      })
    })
  }

}
