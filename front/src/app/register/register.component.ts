import { Component, OnInit } from '@angular/core';
import { InputMaterial } from './../util/inputMaterial';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';


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

  constructor( private _authS : AuthService ) { }

  ngOnInit() {
    InputMaterial.initMaterial();
  }

  registerUser(){
    console.info( this.user );
    console.info( this.accept );

    this._authS.reigsterUser( this.user )
      .subscribe( json => {
        console.info( json );
      }, err => {
        const errorMessage = err.json();
        console.log( errorMessage.message );
      })

  }

}
