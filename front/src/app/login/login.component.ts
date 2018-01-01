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

  constructor(
    private _router : Router ,
    private _authS  : AuthService
  ) { }

  ngOnInit() {
    InputMaterial.initMaterial();
  }

  goToRegister(){
    this._authS.blogin = false;
    this._router.navigate(['register']);
  }



}
