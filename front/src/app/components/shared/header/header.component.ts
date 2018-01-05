import { InputMaterial } from './../../../util/inputMaterial';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private _router : Router,
  private _authS : AuthService  ) { }

  ngOnInit() {
    InputMaterial.initSearchBox();
    InputMaterial.initNavegation();
  }

  public logout(){
    this._authS.logout()
      .then(() => {
        this._router.navigate(["login"]);
      })
  }
}
