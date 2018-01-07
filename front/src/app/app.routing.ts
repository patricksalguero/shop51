import {AuthenticationGuard} from './services/guards/authentication.guard';
import { RouterModule, Routes } from '@angular/router';
import {
  ProductsComponent,
  DashboardComponent,
  ProvidersComponent
} from './components/index';

import { CLIENT_ROUTING } from './components/clients/clients.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/guards/auth.guard';


const APP_ROUTES: Routes = [
  //Publicos
  { path: 'login' ,        component: LoginComponent , canActivate: [AuthGuard] },
  { path: 'register' ,        component: RegisterComponent  , canActivate : [AuthGuard]},

  //Privados - Guards de Autentificación
  { path: 'dashboard',     component: DashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'products',      component: ProductsComponent , canActivate: [AuthenticationGuard]},
  { path: 'providers',     component: ProvidersComponent ,  canActivate: [AuthenticationGuard]},
  { path: 'clients',
    canActivate: [AuthenticationGuard],
    children : CLIENT_ROUTING },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot( APP_ROUTES, {useHash:true});
