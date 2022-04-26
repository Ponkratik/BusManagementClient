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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: LoginComponent },
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
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
