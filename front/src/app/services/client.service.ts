import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { varsApp } from '../configuration/constants';

declare var alert;

@Injectable()
export class ClientService {

  loadingData : boolean = false;
  clients: any[] = [];

  constructor(private _http : HttpClient ) {

  }

  public addClient( client : any ){

  }

  public updateClient( client : any ){

  }

  public deleteClient( _id : string ){

  }

  public getListAll(){
    this.loadingData = true;
    return this._http.get<any[]>(varsApp.endpointDev + "clients", {
      observe: "body", responseType: "json"
    })
  }

}
