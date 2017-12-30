import { RouterModule, Routes } from '@angular/router';
import {
  ClientsComponent,
  ProductsComponent,
  DashboardComponent,
  ProvidersComponent
} from './components/index';

const APP_ROUTES: Routes = [
  { path: 'dashboard',     component: DashboardComponent },
  { path: 'products',      component: ProductsComponent },
  { path: 'providers',     component: ProvidersComponent },
  { path: 'clients',       component: ClientsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
