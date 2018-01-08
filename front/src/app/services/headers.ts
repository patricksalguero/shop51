import { Headers } from '@angular/http';

export class headersConfig {

  public  accessToken : string ;
  public  headers;

  constructor(){

    if( localStorage.getItem('shopusertoken') ){
       this.accessToken  = JSON.parse ( localStorage.getItem('shopusertoken') )['accessToken'];
    }
  }

  public getHeaders()  {
    return new Headers({
      'Authorization' : `Bearer ${ this.accessToken  }`
    })
  }

}
