import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { InputMaterial } from './../util/inputMaterial';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


declare var $;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public user : any = {
    name: "",
    lastname: "",
    email : "",
    password: ""
  };
  public accept : boolean = false;
  public laoding : boolean = false;
  public message : string = "";


  constructor(
    private _authS : AuthService ,
    private _router: Router ) {
  }

  ngOnInit() {
    InputMaterial.initMaterial();
    $("#register-name").focus();
  }

  registerUser(){
    console.info( this.user );
    console.info( this.accept );

    this.laoding = true;

    this._authS.reigsterUser( this.user )
      .subscribe( json => {
        this.laoding = false;
        this.message = "";

        const name = json['user']['name']

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

        console.log( json );

      }, err => {
        this.laoding = false;
        this._authS.logueado = false;
        const erre = err.json();
        $.toast({
          heading: '<h2>Error</h2>',
          text: '<p>'+ erre.message +'</p>',
          showHideTransition: 'fade',
          icon: 'error',
          position : 'top-right'
        })
        console.log( err.json() );
      })

  }

}
