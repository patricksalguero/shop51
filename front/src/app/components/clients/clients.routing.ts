import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add.component';
import { ClientsComponent } from './clients.component';


export  const CLIENT_ROUTING: Routes = [
  { path: 'add', component: AddComponent },
  { path: 'list', component: ClientsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'list' }
];

