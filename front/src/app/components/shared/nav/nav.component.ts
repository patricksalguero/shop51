import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {

  public userLogin : any = null;

  constructor(
    private _authS : AuthService
  ) { }

  ngOnInit() {
    this._authS.getLocal('shopuser').then( ( userJson ) => {
      this.userLogin = userJson;
    })
  }

}
