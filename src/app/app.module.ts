import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';

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
import { BuspageAddComponent } from './components/buspage-add/buspage-add.component';
import { CityAddComponent } from './components/city-add/city-add.component';
import { CityUpdateComponent } from './components/city-update/city-update.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { BusstopListComponent } from './components/busstop-list/busstop-list.component';
import { BusstopAddComponent } from './components/busstop-add/busstop-add.component';
import { BusstopUpdateComponent } from './components/busstop-update/busstop-update.component';
import { RouteUpdateComponent } from './components/route-update/route-update.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { RouteAddComponent } from './components/route-add/route-add.component';
import { TripUpdateComponent } from './components/trip-update/trip-update.component';
import { TripAddComponent } from './components/trip-add/trip-add.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { MapComponent } from './components/map/map.component';

const mapConfig: YaConfig = {
  apikey: "3c9786fa-a5a9-4687-9f70-1dc44b222297",
  lang: "ru_RU",
};

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
    BuspageUpdateComponent,
    BuspageAddComponent,
    CityAddComponent,
    CityUpdateComponent,
    CityListComponent,
    BusstopListComponent,
    BusstopAddComponent,
    BusstopUpdateComponent,
    RouteUpdateComponent,
    RouteListComponent,
    RouteAddComponent,
    TripUpdateComponent,
    TripAddComponent,
    TripListComponent,
    NoAccessComponent,
    MyTripsComponent,
    MapComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularYandexMapsModule.forRoot(mapConfig)
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
