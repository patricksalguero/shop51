import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { InputMaterial } from './../util/inputMaterial';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

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


  constructor( private _authS : AuthService ) {
  }

  ngOnInit() {
    InputMaterial.initMaterial();
    $("#register-email").focus();
    this.user.email = "patrick.salguero.avalos@gmail.com";
  }

  registerUser(){
    console.info( this.user );
    console.info( this.accept );

    this.laoding = true;

    this._authS.reigsterUser( this.user )
      .subscribe( json => {
        this.laoding = false;
        this.message = "";
        
        console.info( json );
      }, err => {
        this.laoding = false;
        const errorMessage = err.json();
        console.log( errorMessage.message );

        this.message = errorMessage.message;
        
      })

  }

}
