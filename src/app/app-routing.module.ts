import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { UserpageUpdateComponent } from './components/userpage-update/userpage-update.component';
import { BuspageComponent } from './components/buspage/buspage.component';
import { BuspageUpdateComponent } from './components/buspage-update/buspage-update.component';
import { BuspageAddComponent } from './components/buspage-add/buspage-add.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityUpdateComponent } from './components/city-update/city-update.component';
import { CityAddComponent } from './components/city-add/city-add.component';
import { BusstopListComponent } from './components/busstop-list/busstop-list.component';
import { BusstopUpdateComponent } from './components/busstop-update/busstop-update.component';
import { BusstopAddComponent } from './components/busstop-add/busstop-add.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { RouteUpdateComponent } from './components/route-update/route-update.component';
import { RouteAddComponent } from './components/route-add/route-add.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripUpdateComponent } from './components/trip-update/trip-update.component';
import { TripAddComponent } from './components/trip-add/trip-add.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'usermanagement', component: UserpageComponent },
  { path: 'usermanagement/update/:id', component: UserpageUpdateComponent},
  { path: 'busmanagement', component: BuspageComponent },
  { path: 'busmanagement/update/:id', component: BuspageUpdateComponent },
  { path: 'busmanagement/add', component: BuspageAddComponent },
  { path: 'citymanagement', component: CityListComponent },
  { path: 'citymanagement/update/:id', component: CityUpdateComponent },
  { path: 'citymanagement/add', component: CityAddComponent },
  { path: 'busstopmanagement', component: BusstopListComponent },
  { path: 'busstopmanagement/update/:id', component: BusstopUpdateComponent },
  { path: 'busstopmanagement/add', component: BusstopAddComponent },
  { path: 'routemanagement', component: RouteListComponent },
  { path: 'routemanagement/update/:id', component: RouteUpdateComponent },
  { path: 'routemanagement/add', component: RouteAddComponent },
  { path: 'tripmanagement', component: TripListComponent },
  { path: 'tripmanagement/update/:id', component: TripUpdateComponent },
  { path: 'tripmanagement/add', component: TripAddComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
