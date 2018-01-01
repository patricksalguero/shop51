import { RouterModule, Routes } from '@angular/router';
import {
  ProductsComponent,
  DashboardComponent,
  ProvidersComponent
} from './components/index';

import { CLIENT_ROUTING } from './components/clients/clients.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const APP_ROUTES: Routes = [
  { path: 'login' ,        component: LoginComponent },
  { path: 'register' ,        component: RegisterComponent },
  { path: 'dashboard',     component: DashboardComponent },
  { path: 'products',      component: ProductsComponent },
  { path: 'providers',     component: ProvidersComponent },
  { path: 'clients',
    children : CLIENT_ROUTING },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot( APP_ROUTES, {useHash:true});
