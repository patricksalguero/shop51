import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private _authS: AuthService, private _router: Router ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      console.log( 'Desde el guard ');
      console.log( state );
      if( !this._authS.logueado ){
        console.log('No esta logueado...');
         this._authS.logout().then(()=>{
           console.log('Cerrando...');
         })

         return false;
      }

    return true;
  }
}
