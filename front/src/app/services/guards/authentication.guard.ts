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

      if( this._authS.logueado || localStorage.getItem('shopusertoken') != undefined ) {
        this._authS.logueado = true;
        return true;
      }

      if( !this._authS.logueado ){
         this._authS.logout().then(()=>{
           console.info('Se ha cerrado sesión.');
           this._router.navigate(['login']);
           return false;
         })
      }

    return true;
  }
}
