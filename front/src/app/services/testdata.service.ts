import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//Convertir observable en Objeto con map
import 'rxjs/add/operator/map';

@Injectable()
export class TestdataService {

  loadingData : boolean  = false;
  data : any [] = [];

  constructor( private _http: Http ) { }

  getData(){
    this.loadingData = true;
    setTimeout(() => {

      this._http
      .get("assets/data/data.json")
      .map( data => data.json() )
      .subscribe( data => {
        this.loadingData = false;
        this.data = data;
      }, error =>{
        this.loadingData  = false;
      });

    }, 250);
  }

}
