import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';

//Cambiar la Fecha a Español
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

import { AppComponent } from './app.component';

//Componentes Personalizados
import { HeaderComponent } from './components/shared/header/header.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { TitlepageComponent } from './components/shared/titlepage/titlepage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { ProductsComponent } from './components/products/products.component';
import { NofoundComponent } from './nofound/nofound.component';
import { LoginComponent } from './login/login.component';

//Rutas
import { APP_ROUTING } from './app.routing';

//Dependencias externas




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    DashboardComponent,
    ClientsComponent,
    ProvidersComponent,
    ProductsComponent,
    NofoundComponent,
    LoginComponent,
    TitlepageComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID , useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
