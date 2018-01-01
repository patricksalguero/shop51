import { Component, OnInit } from '@angular/core';
import { InputMaterial } from './../util/inputMaterial';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    InputMaterial.initMaterial();
  }

}
