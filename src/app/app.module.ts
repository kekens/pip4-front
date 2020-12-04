import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { Ng5SliderModule } from 'ng5-slider';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientInterceptor } from './http-client-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthComponent,
    MainComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    SliderModule,
    Ng5SliderModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [ Title, { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
