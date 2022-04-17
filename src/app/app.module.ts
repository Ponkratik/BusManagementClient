import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { UserpageComponent } from './components/userpage/userpage.component';
import { UserpageUpdateComponent } from './components/userpage-update/userpage-update.component';
import { BuspageComponent } from './components/buspage/buspage.component';
import { BuspageUpdateComponent } from './components/buspage-update/buspage-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    UserpageComponent,
    UserpageUpdateComponent,
    BuspageComponent,
    BuspageUpdateComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
