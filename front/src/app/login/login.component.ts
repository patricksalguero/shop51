import { InputMaterial } from './../util/inputMaterial';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public user : any = {
    email : "",
    password : ""
  };

  public loading : boolean = false;


  constructor(
    private _router : Router ,
    private _authS  : AuthService
  ) {   }

  ngOnInit() {
    InputMaterial.initMaterial();
    InputMaterial.initValidateLoginRegister();
  }

  goToRegister(){
    this._authS.blogin = false;
    this._router.navigate(['register']);
  }

  login(){
    console.log( this.user );
    this.loading = true;

    this._authS.login(  this.user.email , this.user.password )
        .subscribe( json => {
          this.loading = false;
          $.toast({
            heading: '<h2>Bienvenido</h2>',
            text: '<p>Shop51 : Sistema de ventas de Proteinas y Suplementos alimenticios!!</p>',
            showHideTransition: 'fade',
            icon: 'success',
            position : 'top-right'
          })

          console.log( json );
        }, error => {
          this.loading = false;
          const err = error.json();
          $.toast({
            heading: '<h2>Error</h2>',
            text: '<p>'+ err.message +'</p>',
            showHideTransition: 'fade',
            icon: 'error',
            position : 'top-right'
          })
          console.log( error.json() );
        })


  }





}
