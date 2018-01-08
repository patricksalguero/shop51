import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { varsApp } from '../configuration/constants';
import { Http, Headers } from '@angular/http';
import { headersConfig } from './headers';

declare var alert;

@Injectable()
export class ClientService {
  private headers : any = new headersConfig();

  constructor(private _http : Http ) {}

  public addClient( client : any ){
    return this._http.post( varsApp.endpointDev + "clients/add" , client ,{ headers : this.headers.getHeaders() })
      .map( result => result.json() );
  }

  public updateClient( client : any ){
    return this._http.put( varsApp.endpointDev + "clients/update", client , { headers: this.headers.getHeaders() } )
      .map( result => result.json() );
  }

  public deleteClient( _id : string ){
    return this._http.delete( varsApp.endpointDev + "clients/delete/" + _id  , { headers: this.headers.getHeaders() } )
      .map( result => result.json() );
  }

  public getListAll(){
    return this._http.get( varsApp.endpointDev + "clients" , { headers : this.headers.getHeaders() })
      .map( result => result.json() );
  }

  public getClient( id : string ){
    return this._http.get( varsApp.endpointDev + "clients/find/" + id , { headers : this.headers.getHeaders() })
      .map( result => result.json() );
  }

}
