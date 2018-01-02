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
        this._authS.logueado = true;
        this._router.navigated = false;
        this._router.navigate(['dashboard']);

      }, err => {
        this.laoding = false;
        const errorMessage = err.json();
        this.message = errorMessage.message;
      })

  }

}
