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
    $("#login-username").focus();
    this.user.email = "patrick.salguero.avalos@gmail.com";
    $("#login-password").focus();
    this.user.password = "123456";
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
          const name = json.user.name;

          this._authS
            .saveLocal('shopusertoken' , JSON.stringify(json['tokens']))
            .then( () => {
              this._authS.saveLocal('shopuser', JSON.stringify(json['user']))
                .then( () => {
                  $.toast({
                    heading: '<h2>Bienvenido</h2>',
                    text: `<p> <strong>Shop51 :</strong> Hola, ${ name } !! <br> Comercio de Proteínas y Suplementos alimenticios. </p>`,
                    showHideTransition: 'fade',
                    icon: 'success',
                    position : 'top-right'
                  });
                  this._authS.logueado = true;
                  this._router.navigate(['dashboard']);
                })
            })

        }, error => {
          this.loading = false;
          this._authS.logueado = false;
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
