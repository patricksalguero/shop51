import { AuthService } from "./services/auth.service";
import { HttpInterceptor, HttpResponse } from "@angular/common/http";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable, Injector } from "@angular/core";

import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/mergeMap";
import "rxjs/Observable";
import "rxjs/add/observable/throw";

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private tokens : any = undefined;

  constructor(private injector: Injector, private _authS : AuthService) {}

  intercept( req: HttpRequest<any>, next: HttpHandler  ): Observable<HttpEvent<any>> {
    this._authS.getLocal('shopusertoken').then( ( tokens ) => {
      this.tokens['accessToken'] = tokens['accessToken'] ;
      this.tokens['refreshToken'] = tokens['refreshToken'];
    })

    const requestClone = req.clone({
      headers: req.headers.append("Authorization", `Bearer ${ this.tokens['accessToken']}`)
    });

    let auth = this.injector.get(AuthService);

    return next.handle(requestClone)
		.do(event => {
			if (event instanceof HttpResponse) {
				console.log(event)
			}
    }, res => {
      if(res.status == 401) {
				return auth.newtoken( this.tokens['refreshToken'] ).flatMap((data: any) => {

          if( data.accessToken != "" ) {
            this.tokens['accessToken'] = data.accessToken;

            console.log( this.tokens );

            localStorage.setItem("shopusertoken", JSON.stringify( this.tokens ) );

          } else {
						localStorage.removeItem("shopusertoken")

            return Observable.throw(res)
					}

          let requestClone = req.clone({headers: req.headers.append("Authorization", `Bearer ${data.accessToken}`)})

					return next.handle(requestClone)
				})
			}
    })

  }
}
