import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logueado : boolean = false;
  blogin : boolean = true;

  constructor( private _router: Router,
               public _authS : AuthService ){}

  login(){
    this.logueado = true;
    this._router.navigate(["/dashboard"])
  }
}
