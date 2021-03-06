import { AuthenticationGuard } from './../../services/guards/authentication.guard';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add.component';
import { ClientsComponent } from './clients.component';
import { UpdateComponent } from './update.component';


export  const CLIENT_ROUTING: Routes = [
  { path: 'add', component: AddComponent , canActivate: [AuthenticationGuard]},
  { path: 'update/:id', component: UpdateComponent , canActivate: [AuthenticationGuard]},
  { path: 'list', component: ClientsComponent , canActivate: [AuthenticationGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'list' }
];

