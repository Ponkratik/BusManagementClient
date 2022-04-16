import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { UserpageUpdateComponent } from './components/userpage-update/userpage-update.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'usermanagement', component: UserpageComponent },
  { path: 'usermanagement/update/:id', component: UserpageUpdateComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
