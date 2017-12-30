import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styles: []
})
export class ClientsComponent implements OnInit {

  title : string = "Clientes";

  constructor() { }

  ngOnInit() {
  }

}
