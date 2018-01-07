import { Http , Headers , Request , Response } from '@angular/http';

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';

import { varsApp } from '../configuration/constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  logueado : boolean = false;
  blogin   : boolean = true;

  private headers = new Headers({ "Content-Type": "application/json" });
  constructor( private _http: Http , private _router : Router , private _httpC : HttpClient ) { }

  public reigsterUser( user ){
    const url = varsApp.endpointDev + "users/register";
    return this._http.post( url , user , { headers : this.headers  }  )
            .map ( result => result.json() );
  }

  public login( email, password ){
    const url = varsApp.endpointDev + "users/login";
    return this._http.post( url ,  { email , password } , { headers : this.headers } )
            .map( result => result.json() )
  }

  public newtoken( refreshToken ){
    const url = varsApp.endpointDev + "users/newtoken";
    return this._httpC.post<any>( url , {refreshToken} , {
      observe: "body", responseType: "json"
    })
  }

  public saveLocal( name , value  ){
    const promise = new Promise( (resolve , reject) => {
      if ( localStorage ){
        localStorage.setItem( name.toLowerCase() , value );
        resolve();
      }
    })
    return promise;
  }

  public getLocal( name ){
    const promise = new Promise( (resolve , reject) => {
      if ( localStorage ){
        resolve( JSON.parse ( localStorage.getItem( name ) ) );
      }
    })
    return promise;
  }

  public removeLocal( name ){
    const promise = new Promise( (resolve , reject) => {
      if ( localStorage ){
        localStorage.removeItem( name.toLowerCase() );
        resolve();
        return;
      }
    })
    return promise;
  }

  public logout(){
    const promise = new Promise( (resolve , reject) => {

      this.removeLocal('shopusertoken').then( () => {
        this.removeLocal('shopuser').then( () => {
          this.logueado = false;
          this.blogin = true;
          resolve();
        })
      })

    })
    return promise;
  }

}
