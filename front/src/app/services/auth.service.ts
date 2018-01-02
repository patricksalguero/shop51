import { Http , Headers , Request , Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';

import { varsApp } from '../configuration/constants';

@Injectable()
export class AuthService {

  logueado : boolean = false;
  blogin   : boolean = true;

  constructor( private _http: Http , private _router : Router ) { }

  public reigsterUser( user ){
    const headers = new Headers({ "Content-Type": "application/json" });
    const url = varsApp.endpointDev + "users/register";
    console.info( url );
    return this._http.post( url , user , { headers  }  )
            .map ( result => result.json() );
  }

  public login(){

  }

  public logout(){

  }

}
