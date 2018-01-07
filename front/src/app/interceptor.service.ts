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

  constructor(private injector: Injector) {}

  intercept( req: HttpRequest<any>, next: HttpHandler  ): Observable<HttpEvent<any>> {

    this.tokens = JSON.parse ( localStorage.getItem('shopusertoken') )

    const requestClone = req.clone({
      headers: req.headers.append("Authorization", `Bearer ${ this.tokens['accessToken']}`)
    });

    let auth = this.injector.get(AuthService);

    return next.handle(requestClone)
		.do(event => {
			if (event instanceof HttpResponse) {
				//console.log(event)
			}
    }, res => {
      if(res.status == 401 || res.status == 403 ) {

        return auth.newtoken( this.tokens['refreshToken'] ).subscribe((data: any) => {

          if( data.accessToken != "" ) {
            this.tokens['accessToken'] = data.accessToken;

            localStorage.setItem("shopusertoken", JSON.stringify( this.tokens ) );

          } else {
						localStorage.removeItem("shopusertoken")

            return Observable.throw(res)
					}

          let requestClone2 = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${data.accessToken}`)
          })

          console.log( requestClone2 )
          return next.handle(requestClone2 ).do( e => {});
        })


			}
    })

  }
}
