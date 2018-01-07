import { HttpModule } from '@angular/http';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AddComponent } from './components/clients/add.component';
import { RegisterComponent } from './register/register.component';

//Servicios
//
import { InterceptorService } from './interceptor.service';
import { TestdataService } from './services/testdata.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/guards/auth.guard';
import { AuthenticationGuard } from './services/guards/authentication.guard';
//
import { ClientService } from './services/client.service';

//Rutas
import { APP_ROUTING } from './app.routing';

//Dependencias externas
import { DataTableModule } from "angular2-datatable";
import { ToastyModule } from 'ng2-toasty';

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
    TitlepageComponent,
    AddComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpModule,
    HttpClientModule,
    FormsModule,
    DataTableModule,
    ToastyModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID , useValue: 'es' },
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true},
    TestdataService,
    ClientService,
    AuthService,
    AuthGuard,
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
