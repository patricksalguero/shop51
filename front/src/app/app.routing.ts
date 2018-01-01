import { RouterModule, Routes } from '@angular/router';
import {
  ProductsComponent,
  DashboardComponent,
  ProvidersComponent
} from './components/index';


import { CLIENT_ROUTING } from './components/clients/clients.routing';
import { LoginComponent } from './login/login.component';



const APP_ROUTES: Routes = [
  { path: '' ,             component: LoginComponent },
  { path: 'dashboard',     component: DashboardComponent },
  { path: 'products',      component: ProductsComponent },
  { path: 'providers',     component: ProvidersComponent },
  { path: 'clients',
    children : CLIENT_ROUTING },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
];

export const APP_ROUTING = RouterModule.forRoot( APP_ROUTES, {useHash:true});
