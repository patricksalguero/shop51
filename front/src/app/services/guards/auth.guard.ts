import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private _authS : AuthService ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if( this._authS.logueado  || localStorage.getItem('shopuser') != null ) return false;

      if( state.url.startsWith("/register") ){
        this._authS.blogin = false;
      }else if( state.url.startsWith("/login") ){
        this._authS.blogin = true;
      }
    // console.log( state );
    return true;
  }
}
