import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute , Router } from '@angular/router';


declare var $;

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styles: []
})
export class UpdateComponent implements OnInit {

  public title : string = "Actualizar Cliente";
  public loading: boolean = false;
  public client : any =  {
    name : '',
    lastname: '',
    email : '',
    address : ''
  }

  public idClient : string = "";


  constructor(private _clientS : ClientService ,
    private _routerAct : ActivatedRoute,
    private _router : Router ) { }

  ngOnInit() {
    this.loading = true;
    this._routerAct.params.subscribe( params => {
      this.idClient = params['id'];
      console.log( this.idClient );
      this._clientS.getClient( this.idClient ).subscribe( (result : any) => {
        console.log( result );
        this.client = result.client;
        this.loading = false;
      })
    })
  }

  updateClient(){
    console.log( this.client )
    this._clientS.updateClient( this.client )
      .subscribe( result => {
        $.toast({
          heading: '<h2>Exitoso</h2>',
          text: '<p>'+ 'Se ha actualizado con exito' +'</p>',
          showHideTransition: 'fade',
          icon: 'success',
          position : 'top-right'
        })
        this._router.navigate(['/clients'])
      },err => {
        $.toast({
          heading: '<h2>Error </h2>',
          text: '<p>'+ 'No se ha actualizado , intentelo denuevo por favor.' +'</p>',
          showHideTransition: 'fade',
          icon: 'error',
          position : 'top-right'
        })
      })
  }

}
